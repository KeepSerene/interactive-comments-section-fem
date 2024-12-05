import "./editCommentForm.css";

// React imports
import { useEffect, useRef, useState } from "react";

// Context import
import { useCommentsContext } from "../CommentsProvider";

// Library imports
import { toast } from "react-toastify";
import EditReplyForm from "../editReplyForm/EditReplyForm";

function EditCommentForm({
  comment,
  setIsInEditMode,
  isReplyCard,
  parentCommentId,
}) {
  const [updatedContent, setUpdatedContent] = useState(comment.content);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  if (isReplyCard) {
    return (
      <EditReplyForm
        reply={comment}
        setIsInEditMode={setIsInEditMode}
        parentCommentId={parentCommentId}
      />
    );
  }

  const { updateCommentContent } = useCommentsContext();

  const handleUpdate = (event) => {
    event.preventDefault();

    try {
      updateCommentContent(comment.id, updatedContent.trim());
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
        ref={textareaRef}
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
