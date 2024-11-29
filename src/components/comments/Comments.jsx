import "./comments.css";

// React imports
import { useState } from "react";

// Data import
import data from "../../../data/data.json";

// Component imports
import CommentCard from "../commentCard/CommentCard";

function Comments({ setIsModalOpen }) {
  const [comments, setComments] = useState(data.comments);

  return (
    <article className="comments">
      <h2 className="sr-only">Comments</h2>

      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          currentUser={data.currentUser}
          setIsModalOpen={setIsModalOpen}
        />
      ))}
    </article>
  );
}

export default Comments;
