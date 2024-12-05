import "./replyForm.css";

// React imports
import { useState } from "react";

// Data import
import data from "../../../data/data.json";

// Context imports
import { useCommentsContext } from "../CommentsProvider";

// Library imports
import { toast } from "react-toastify";

function ReplyForm({ parentCommentId, replyingTo, setIsInReplyMode }) {
  const [currentUserReply, setCurrentUserReply] = useState({
    user: data.currentUser,
    content: `@${replyingTo},`,
    replyingTo,
  });
  const { addReply } = useCommentsContext();
  const isOnSmallScr = window.matchMedia("(width < 768px)").matches; // Small screens < 768px

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      const replyContent = currentUserReply.content
        .replace(`@${replyingTo},`, "")
        .trim();

      if (!replyContent) {
        toast.warning("Reply content can't be empty!");
        return;
      }

      addReply(parentCommentId, { ...currentUserReply, content: replyContent });
      toast.success("Reply added successfully!");
      setIsInReplyMode(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the reply:", error.message);
    }
  };

  return (
    <div className="add-reply-card">
      <img
        src="/images/avatars/image-juliusomo.png"
        alt="Juliusomo avatar"
        title="You"
        className="avatar hide-on-small-scr"
      />

      <form className="reply-form" onSubmit={handleSubmit}>
        <label htmlFor="current-user-reply-field" className="sr-only">
          Enter your reply
        </label>

        <textarea
          id="current-user-reply-field"
          value={currentUserReply.content}
          onChange={(event) =>
            setCurrentUserReply({
              ...currentUserReply,
              content: event.target.value,
            })
          }
          required
          rows={3}
          placeholder="Add a reply..."
        />

        <button
          type="submit"
          disabled={!currentUserReply.content.trim()}
          className="reply-btn hide-on-small-scr"
        >
          Reply
        </button>
      </form>

      {isOnSmallScr && (
        <div className="add-reply-card-footer">
          <img
            src="/images/avatars/image-juliusomo.png"
            alt="Juliusomo avatar"
            className="avatar"
          />

          <button
            type="button"
            disabled={!currentUserReply.content.trim()}
            onClick={handleSubmit}
            className="reply-btn"
          >
            Reply
          </button>
        </div>
      )}
    </div>
  );
}

export default ReplyForm;
