import { useState } from "react";
import "./App.css";

// Component imports
import AddCommentForm from "./components/addCommentForm/AddCommentForm";
import Comments from "./components/comments/Comments";
import Modal from "./components/modal/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="app">
      <main className="wrapper">
        <Comments setIsModalOpen={setIsModalOpen} />
        <AddCommentForm />
      </main>

      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}

export default App;
