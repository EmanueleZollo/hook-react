
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";
import { ListGroup } from "react-bootstrap";
import {useState, useEffect} from 'react'

const CommentArea = (props) => {
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)


  const fetchComments = async () => {
    setIsLoading(true);
    try {
      let response = await fetch("https://striveschool-api.herokuapp.com/api/books/" + props.asin + "/comments/", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGY5Y2NhMThkM2Q0OTAwMTRjZmQ3ZmEiLCJpYXQiOjE2OTQwOTI0NTAsImV4cCI6MTY5NTMwMjA1MH0.fgB8DJQ6GZCMZGZ7c_5mcKN-RG4yiVrx-xXRPLfBdG4"
        }
      });
      console.log(response);
      if (response.ok) {
        let comments = await response.json();
        setComments(comments);
        setIsLoading(false);
        setIsError(false);
        setIsFirstLoad(false);
        // this.setState({ comments: comments, isLoading: false, isError: false, isFirstLoad: false });
      } else {
        console.log("error");
        setIsLoading(false);
        setIsError(true);
        // this.setState({ isLoading: false, isError: true });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
        setIsError(true);
      // this.setState({ isLoading: false, isError: true });
    }
  };

  useEffect( () => {
    console.log("come componentDidMount");
  }, [])

  useEffect( () => {
    console.log("come componentDidUpdate");
    fetchComments();
  }, [props.asin])

  // componentDidUpdate(prevProps) {
  //   if (prevProps.asin !== this.props.asin) {
  //     this.fetchComments();
  //     console.log("siamo in componentDidUpdate e stiamo fetchando");
  //   } else {
  //     console.log("siamo in componentDidUpdate ma senza più fetch");
  //   }
  // }

    return (
      <div className="text-center">
        <h2>CommentArea</h2>
        {isError && <Error />}
        <AddComment asin={props.asin} />
        {isLoading && <Loading />}

        {!isLoading && !isFirstLoad && comments.length === 0 ? (
          <ListGroup>
            <ListGroup.Item>Non ci sono ancora commenti</ListGroup.Item>
          </ListGroup>
        ) : (
          <CommentList commentsToShow={comments} />
        )}
      </div>
    );
  }

export default CommentArea;
