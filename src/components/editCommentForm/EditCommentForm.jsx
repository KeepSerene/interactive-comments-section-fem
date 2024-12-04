import "./editCommentForm.css";

// React imports
import { useState } from "react";

// Context import
import { useCommentsContext } from "../CommentsProvider";

// Library imports
import { toast } from "react-toastify";

function EditCommentForm({ comment, setIsInEditMode }) {
  const [updatedContent, setUpdatedContent] = useState(comment.content);

  const { updateComment } = useCommentsContext();

  const handleUpdate = (event) => {
    event.preventDefault();

    try {
      updateComment(comment.id, updatedContent.trim());
      setIsInEditMode(false);
      toast.success("Comment edited successfully!");
    } catch (error) {
      console.error(error);
      toast.error(
        "An error occurred while updating the comment:",
        error.message
      );
    }
  };

  return (
    <form className="edit-form" onSubmit={handleUpdate}>
      <label htmlFor="edit-comment-field" className="sr-only">
        Edit your comment
      </label>

      <textarea
        id="edit-comment-field"
        value={updatedContent}
        onChange={(event) => setUpdatedContent(event.target.value)}
        required
        rows={3}
        placeholder="Add a comment..."
      />

      <button
        type="submit"
        disabled={!updatedContent.trim()}
        className="update-btn"
      >
        Update
      </button>
    </form>
  );
}

export default EditCommentForm;
