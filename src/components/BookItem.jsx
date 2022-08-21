import React from "react";
import { Row, Col, Button, Card, Ratio } from "react-bootstrap";

const BookItem = ({ title, thumbnail, authors, infoLink, publishedDate }) => {
  return (
    <Card>
      <Row className="no-gutters">
        <Col sm={2}>
          <Card.Img src={thumbnail} />
        </Col>
        <Col sm={10}>
          <Card.Body>
            <Card.Title>{title}</Card.Title>

            <Card.Subtitle>{authors}</Card.Subtitle>
            <Card.Text>{publishedDate}</Card.Text>

            <Button
              variant="outline-primary"
              href={infoLink}
              target="_blank"
              className="mb-2 mt-2"
            >
              Click Me!
            </Button>
            <Card.Footer>{publishedDate}</Card.Footer>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default BookItem;
