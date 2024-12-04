import "./addCommentForm.css";

// React imports
import { useState } from "react";

// Data import
import data from "../../../data/data.json";

// Context imports
import { useCommentsContext } from "../CommentsProvider";

// Library imports
import { toast } from "react-toastify";

function AddCommentForm() {
  const [currentUserComment, setCurrentUserComment] = useState({
    user: data.currentUser,
    content: "",
  });

  const { addComment } = useCommentsContext();

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      addComment(currentUserComment);
      toast.success("Comment added successfully!");
      setCurrentUserComment({ ...currentUserComment, content: "" });
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the comment:", error.message);
    }
  };

  const isOnSmallScr = window.matchMedia("(width < 768px)").matches; // Small screens < 768px

  return (
    <div className="add-comment-card">
      <img
        src="/images/avatars/image-juliusomo.png"
        alt="Juliusomo avatar"
        title="You"
        className="avatar hide-on-small-scr"
      />

      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="current-user-comment-field" className="sr-only">
          Enter your comment
        </label>

        <textarea
          id="current-user-comment-field"
          value={currentUserComment.content}
          onChange={(event) =>
            setCurrentUserComment({
              ...currentUserComment,
              content: event.target.value,
            })
          }
          required
          rows={3}
          placeholder="Add a comment..."
        />

        <button
          type="submit"
          disabled={!currentUserComment.content.trim()}
          className="send-btn hide-on-small-scr"
        >
          Send
        </button>
      </form>

      {isOnSmallScr && (
        <div className="add-comment-card-footer">
          <img
            src="/images/avatars/image-juliusomo.png"
            alt="Juliusomo avatar"
            className="avatar"
          />

          <button
            type="button"
            disabled={!currentUserComment.content.trim()}
            onClick={handleSubmit}
            className="send-btn"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}

export default AddCommentForm;
