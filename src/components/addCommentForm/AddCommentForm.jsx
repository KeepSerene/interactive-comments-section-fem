import "./addCommentForm.css";

// React imports
import { useState } from "react";

function AddCommentForm() {
  const [currentUserComment, setCurrentUserComment] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(currentUserComment.trim());

    setCurrentUserComment("");
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
          value={currentUserComment}
          onChange={(event) => setCurrentUserComment(event.target.value)}
          required
          rows={3}
          placeholder="Add a comment..."
        />

        <button
          type="submit"
          disabled={!currentUserComment.trim()}
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
            disabled={!currentUserComment.trim()}
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
