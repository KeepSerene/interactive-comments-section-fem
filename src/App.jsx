import "./App.css";

// React imports
import { useState } from "react";

// Context provider import
import { CommentsProvider } from "./components/CommentsProvider";

// Component imports
import AddCommentForm from "./components/addCommentForm/AddCommentForm";
import Comments from "./components/comments/Comments";
import Modal from "./components/modal/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <CommentsProvider>
      <div className="app">
        <main className="wrapper">
          <Comments setIsModalOpen={setIsModalOpen} />
          <AddCommentForm />
        </main>

        {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
      </div>
    </CommentsProvider>
  );
}

export default App;
