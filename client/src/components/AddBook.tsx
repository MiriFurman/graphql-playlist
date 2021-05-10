import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  addBookMutation,
  getAuthorsQuery,
  getBooksQuery,
} from "../queries/queries";

const AddBook = () => {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [addBook, {}] = useMutation(addBookMutation);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    addBook({
      variables: { name, genre, authorId },
      refetchQueries: [{ query: getBooksQuery }],
    }).then(() => {
      setName("");
      setGenre("");
      setAuthorId("");
    });
  };

  return (
    <form className="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
          <option>Select author</option>
          {loading && <option disabled>Loading authors</option>}
          {error && <option disabled>Error Loading authors</option>}
          {data &&
            data.authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
