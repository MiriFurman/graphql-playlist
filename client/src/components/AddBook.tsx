import React from "react";
import { useQuery } from "@apollo/client";
import { getAuthorsQuery } from "../queries/queries";

const AddBook = () => {
  const { loading, error, data } = useQuery(getAuthorsQuery);

  return (
    <form id="add-book">
      <div className="field">
        <label>Book name:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Author:</label>
        <select>
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
