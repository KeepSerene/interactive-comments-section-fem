import "./appContent.css";

// React imports
import { useState } from "react";

// Context import
import { useCommentsContext } from "../CommentsProvider";

// Library import
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

// Component imports
import Comments from "../comments/Comments";
import AddCommentForm from "../addCommentForm/AddCommentForm";
import Modal from "../modal/Modal";

function AppContent() {
  const [commentToDeleteId, setCommentToDeleteId] = useState(null);
  const { deleteComment } = useCommentsContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteComment = () => {
    if (commentToDeleteId) {
      try {
        deleteComment(commentToDeleteId);
        toast.success("Comment deleted successfully!");
      } catch (error) {
        console.error(error);
        toast.error(
          "An error occurred while deleting the comment:",
          error.message
        );
      }
    }
  };

  return (
    <div className="app">
      <main className="wrapper">
        <Comments
          setIsModalOpen={setIsModalOpen}
          setCommentToDeleteId={setCommentToDeleteId}
        />
        <AddCommentForm />
      </main>

      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          handleDelete={handleDeleteComment}
        />
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        draggable={true}
      />
    </div>
  );
}

export default AppContent;
