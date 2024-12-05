import "./editReplyForm.css";

// React imports
import { useState } from "react";

// Context import
import { useCommentsContext } from "../CommentsProvider";

// Library imports
import { toast } from "react-toastify";

function EditReplyForm({ reply, setIsInEditMode, parentCommentId }) {
  const [updatedReplyContent, setUpdatedReplyContent] = useState(reply.content);

  const { updateReplyContent } = useCommentsContext();

  const handleUpdate = (event) => {
    event.preventDefault();

    try {
      updateReplyContent(parentCommentId, reply.id, updatedReplyContent.trim());
      setIsInEditMode(false);
      toast.success("Reply edited successfully!");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the reply:", error.message);
    }
  };

  return (
    <form className="edit-reply-form" onSubmit={handleUpdate}>
      <label htmlFor="edit-reply-field" className="sr-only">
        Edit your comment
      </label>

      <textarea
        id="edit-reply-field"
        value={updatedReplyContent}
        onChange={(event) => setUpdatedReplyContent(event.target.value)}
        required
        rows={3}
        placeholder="Add a reply..."
      />

      <button
        type="submit"
        disabled={!updatedReplyContent.trim()}
        className="reply-update-btn"
      >
        Update
      </button>
    </form>
  );
}

export default EditReplyForm;
