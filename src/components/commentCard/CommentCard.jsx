import "./commentCard.css";

// Context import
import { useCommentsContext } from "../CommentsProvider";

// Helper function imports
import { getElapsedTimeStr } from "../../utils/getElapsedTimeStr";

// React imports
import { useState } from "react";

// Component imports
import EditCommentForm from "../editCommentForm/EditCommentForm";
import ReplyForm from "../replyForm/ReplyForm";

function CommentCard({
  comment,
  currentUser,
  setIsModalOpen,
  setCommentToDeleteId,
  isReplyCard = false,
  parentCommentId, // Prop to pass parent comment ID for reply score updates (passed during the recursive call)
  // Passed from AppContent.jsx:
  setReplyToDeleteId = () => {},
  setParentCommentId = () => {},
}) {
  const { updateCommentScore, updateReplyScore } = useCommentsContext();
  const timestamp = getElapsedTimeStr(comment.createdAt);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [isInReplyMode, setIsInReplyMode] = useState(false);
  const isOnSmallScr = window.matchMedia("(width < 768px)").matches; // Small screens < 768px

  const handleUpdateScore = (newScore) => {
    if (isReplyCard) {
      updateReplyScore(parentCommentId, comment.id, newScore);
    } else {
      updateCommentScore(comment.id, newScore);
    }
  };

  const onDelete = () => {
    setIsModalOpen(true);

    if (isReplyCard) {
      setParentCommentId(parentCommentId);
      setReplyToDeleteId(comment.id);
    } else {
      setCommentToDeleteId(comment.id);
    }
  };

  return (
    <div className="card-container">
      {/* Comments */}
      <div className="comment-card">
        <div className="score-controller large-scr-elem">
          <button
            type="button"
            onClick={() => handleUpdateScore(comment.score + 1)}
            aria-label="Upvote the comment"
            title="Upvote"
          >
            <svg
              width="11"
              height="11"
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
            >
              <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" />
            </svg>
          </button>

          <p className="score">{comment.score}</p>

          <button
            type="button"
            onClick={() => handleUpdateScore(comment.score - 1)}
            aria-label="Downvote the comment"
            title="Downvote"
          >
            <svg
              width="11"
              height="3"
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
            >
              <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" />
            </svg>
          </button>
        </div>

        <div className="card-info">
          <section className="card-header">
            <div className="user-info">
              <img
                src={comment.user.image.png}
                alt={`${comment.user.username} avatar`}
                className="avatar"
              />

              <h4 className="username">{comment.user.username}</h4>

              {comment.user.username === currentUser.username && (
                <p className="you-tag">you</p>
              )}

              <p className="timestamp">{timestamp}</p>
            </div>

            {comment.user.username === currentUser.username ? (
              <div className="current-user-actions large-scr-elem">
                <button
                  type="button"
                  onClick={onDelete}
                  className="delete-btn btn"
                >
                  <svg
                    width="12"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                    className="delete-icon"
                  >
                    <path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" />
                  </svg>

                  <span>Delete</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsInEditMode(true)}
                  className="btn"
                >
                  <svg
                    width="14"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                    className="edit-icon"
                  >
                    <path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" />
                  </svg>

                  <span>Edit</span>
                </button>
              </div>
            ) : (
              !isReplyCard && (
                <button
                  type="button"
                  onClick={() => setIsInReplyMode(!isInReplyMode)}
                  className="btn large-scr-elem"
                >
                  <svg
                    width="14"
                    height="13"
                    xmlns="http://www.w3.org/2000/svg"
                    className="reply-icon"
                  >
                    <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" />
                  </svg>

                  <span>Reply</span>
                </button>
              )
            )}
          </section>

          {isInEditMode ? (
            <EditCommentForm
              comment={comment}
              setIsInEditMode={setIsInEditMode}
              isReplyCard={isReplyCard}
              parentCommentId={parentCommentId}
            />
          ) : (
            <p className="card-content">{comment.content}</p>
          )}
        </div>

        {isOnSmallScr && (
          <div className="card-footer">
            <div className="score-controller">
              <button
                type="button"
                onClick={() => handleUpdateScore(comment.score + 1)}
                aria-label="Upvote the comment"
                title="Upvote"
              >
                <svg
                  width="11"
                  height="11"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                >
                  <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" />
                </svg>
              </button>

              <p className="score">{comment.score}</p>

              <button
                type="button"
                onClick={() => handleUpdateScore(comment.score - 1)}
                aria-label="Downvote the comment"
                title="Downvote"
              >
                <svg
                  width="11"
                  height="3"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                >
                  <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" />
                </svg>
              </button>
            </div>

            {comment.user.username === currentUser.username ? (
              <div className="current-user-actions">
                <button
                  type="button"
                  onClick={onDelete}
                  className="delete-btn btn"
                >
                  <svg
                    width="12"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                    className="delete-icon"
                  >
                    <path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" />
                  </svg>

                  <span>Delete</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsInEditMode(true)}
                  className="btn"
                >
                  <svg
                    width="14"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                    className="edit-icon"
                  >
                    <path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" />
                  </svg>

                  <span>Edit</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsInReplyMode(!isInReplyMode)}
                className="btn"
              >
                <svg
                  width="14"
                  height="13"
                  xmlns="http://www.w3.org/2000/svg"
                  className="reply-icon"
                >
                  <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" />
                </svg>

                <span>Reply</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Reply form */}
      {isInReplyMode && (
        <ReplyForm
          parentCommentId={comment.id}
          replyingTo={comment.user.username}
          setIsInReplyMode={setIsInReplyMode}
        />
      )}

      {/* Replies */}
      {comment.replies?.length > 0 && (
        <div className="replies">
          {comment.replies.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              currentUser={currentUser}
              setIsModalOpen={setIsModalOpen}
              setCommentToDeleteId={setCommentToDeleteId}
              isReplyCard={true}
              parentCommentId={comment.id}
              setParentCommentId={setParentCommentId}
              setReplyToDeleteId={setReplyToDeleteId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentCard;
