
import { Card } from "react-bootstrap";


const SingleBook = (props) => {
  
    return (
      <>
        <Card
          onClick={() => {
            props.setNewAsin(props.book.asin);
          }}
          style={{
            border: props.book.asin === props.selectedAsin ? "3px solid red" : "3px solid rgb(0 0 0 / 12.5%)"
          }}
        >
          <Card.Img variant="top" src={props.book.img} />
          <Card.Body>
            <Card.Title style={{ color: "black" }}>{props.book.title}</Card.Title>
          </Card.Body>
        </Card>
      </>
    );
  }


export default SingleBook;
