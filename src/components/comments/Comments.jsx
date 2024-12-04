import "./comments.css";

// Data import
import data from "../../../data/data.json";

// Context imports
import { useCommentsContext } from "../CommentsProvider";

// Component imports
import CommentCard from "../commentCard/CommentCard";

function Comments({ setIsModalOpen, setCommentToDeleteId }) {
  const { comments } = useCommentsContext();

  return (
    <article className="comments">
      <h2 className="sr-only">Comments</h2>

      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          currentUser={data.currentUser}
          setIsModalOpen={setIsModalOpen}
          setCommentToDeleteId={setCommentToDeleteId}
        />
      ))}
    </article>
  );
}

export default Comments;
