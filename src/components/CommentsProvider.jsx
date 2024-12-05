// React imports
import { createContext, useContext, useEffect, useState } from "react";

// Data import
import data from "../../data/data.json";

const CommentsContext = createContext();

export function CommentsProvider({ children }) {
  const [comments, setComments] = useState([]);

  // Read operation
  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    setComments(storedComments ? JSON.parse(storedComments) : data.comments);
  }, []);

  // For comments:
  // Create operation
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

  // Update operation
  const updateCommentContent = (id, updatedContent) => {
    const updatedComments = comments.map((comment) =>
      comment.id === id ? { ...comment, content: updatedContent } : comment
    );
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  const updateCommentScore = (id, updatedScore) => {
    const updatedComments = comments.map((comment) =>
      comment.id === id ? { ...comment, score: updatedScore } : comment
    );
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  // Delete operation
  const deleteComment = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  // For replies:
  // Create operation
  const addReply = (parentCommentId, newReply) => {
    const replyToAdd = {
      id: new Date().toISOString(),
      content: newReply.content,
      createdAt: Date.now(),
      score: 0,
      replyingTo: newReply.replyingTo,
      user: newReply.user,
    };

    const updatedComments = comments.map((comment) =>
      comment.id === parentCommentId
        ? { ...comment, replies: [...(comment.replies || []), replyToAdd] }
        : comment
    );

    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  // Update operation
  const updateReplyContent = (
    parentCommentId,
    replyId,
    updatedReplyContent
  ) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === parentCommentId) {
        return {
          ...comment,
          replies: comment.replies.map((reply) =>
            reply.id === replyId
              ? { ...reply, content: updatedReplyContent }
              : reply
          ),
        };
      }

      return comment;
    });

    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  const updateReplyScore = (parentCommentId, replyId, updatedReplyScore) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === parentCommentId) {
        return {
          ...comment,
          replies: comment.replies.map((reply) =>
            reply.id === replyId
              ? { ...reply, score: updatedReplyScore }
              : reply
          ),
        };
      }

      return comment;
    });

    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  // Delete operation
  const deleteReply = (parentCommentId, replyId) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === parentCommentId) {
        return {
          ...comment,
          replies: comment.replies.filter((reply) => reply.id !== replyId),
        };
      }

      return comment;
    });

    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  return (
    <CommentsContext.Provider
      value={{
        comments,
        addComment,
        updateCommentContent,
        updateCommentScore,
        deleteComment,
        addReply,
        updateReplyContent,
        updateReplyScore,
        deleteReply,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}

export const useCommentsContext = () => useContext(CommentsContext);
