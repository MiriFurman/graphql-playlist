import React from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: bookId },
  });

  if (bookId) {
    return (
      <div className="book-details">
        {loading && <p>Loading...</p>}
        {error && <p>Error :(</p>}
        {data && (
          <div>
            <h2>{data.book.name}</h2>
            <p>{data.book.genre}</p>
            <p>{data.book.author.name}</p>
            <p>All books by this author:</p>
            <ul className="other-books">
              {data.book.author.books.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  } else {
    return <div className="book-details">No book selected...</div>;
  }
};

export default BookDetails;
