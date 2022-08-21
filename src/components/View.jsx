import React, { useState } from "react";
import BookItem from "./BookItem";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const View = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getBooks = (q) => {
    setBooks([]);
    setIsLoading(true);
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${q
        .toLowerCase()
        .replace(" ", "+")}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setBooks(data["items"]);
      })
      .catch((err) => {
        alert("bruh!!");
      });
  };

  return (
    <Container fluid className="mt-5">
      <Row>
        <Col>
          <h3 className="display-3 text-center" style={{ fontWeight: 500 }}>
            <FontAwesomeIcon icon={faReact} spin /> React Book Finder
          </h3>
        </Col>
      </Row>
      <Row className="my-4 mt-4 ">
        <Col sm={11} xs={11}>
          <Form.Control
            type="text"
            placeholder="Title or author"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </Col>
        <Col sm={1} xs={1}>
          <Button
            variant="outline-success"
            onClick={(e) => {
              e.preventDefault();
              if (!query || query.length < 3)
                alert("Search query can't be less than three characters.");
              else {
                getBooks(query);
              }
            }}
          >
            Search
          </Button>
        </Col>
        {isLoading && (
          <h1 className="text-center mt-5">
            <FontAwesomeIcon icon={faSpinner} spin />
          </h1>
        )}
        {books.length === 0 ? (
          <></>
        ) : (
          books.map((book) => {
            return (
              <Row className="mt-5">
                <Col className="mb-2">
                  <BookItem
                    title={book.volumeInfo.title}
                    thumbnail={
                      book?.volumeInfo?.imageLinks?.smallThumbnail || ""
                    }
                    authors={
                      book?.volumeInfo?.authors?.join(", ") || "Unknown Author"
                    }
                    infoLink={book.volumeInfo.infoLink}
                    publishedDate={book?.volumeInfo?.publishedDate || ""}
                  />
                </Col>
              </Row>
            );
          })
        )}
        ;
      </Row>
    </Container>
  );
};

export default View;
