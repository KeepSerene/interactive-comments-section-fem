import "./modal.css";

function Modal({ setIsModalOpen, handleDelete }) {
  const handleClick = (event) => {
    event.stopPropagation();
    setIsModalOpen(false);
  };

  const onDelete = (event) => {
    event.preventDefault();
    handleDelete();
    setIsModalOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={handleClick}>
      <section className="modal" onClick={(event) => event.stopPropagation()}>
        <h3>Delete comment</h3>

        <p>
          Are you sure you want to delete this commnet? This will remove the
          comment and can't be undone!
        </p>

        <div className="modal-actions">
          <button
            type="button"
            onClick={handleClick}
            className="modal-btn cancel"
          >
            No, cancel
          </button>

          <button type="button" onClick={onDelete} className="modal-btn delete">
            Yes, delete
          </button>
        </div>
      </section>
    </div>
  );
}

export default Modal;
