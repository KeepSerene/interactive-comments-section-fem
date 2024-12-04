// React imports
import { createContext, useContext, useEffect, useState } from "react";

// Data import
import data from "../../data/data.json";

const CommentsContext = createContext();

export function CommentsProvider({ children }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    setComments(storedComments ? JSON.parse(storedComments) : data.comments);
  }, []);

  const addComment = (newComment) => {
    const commentToAdd = {
      id: new Date().toISOString(),
      content: newComment.content,
      createdAt: Date.now(),
      score: 0,
      user: newComment.user,
      replies: [],
    };

    const updatedComments = [...comments, commentToAdd];
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  const updateComment = (id, updatedContent) => {
    const updatedComments = comments.map((comment) =>
      comment.id === id ? { ...comment, content: updatedContent } : comment
    );
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  const deleteComment = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  return (
    <CommentsContext.Provider
      value={{ comments, addComment, updateComment, deleteComment }}
    >
      {children}
    </CommentsContext.Provider>
  );
}

export const useCommentsContext = () => useContext(CommentsContext);
