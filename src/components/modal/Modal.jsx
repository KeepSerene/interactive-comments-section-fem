import "./modal.css";

function Modal({ setIsModalOpen }) {
  const handleDelete = (event) => {
    event.stopPropagation();
    console.log("Delete");
  };

  return (
    <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
      <section className="modal">
        <h3>Delete comment</h3>

        <p>
          Are you sure you want to delete this commnet? This will remove the
          comment and can't be undone!
        </p>

        <div className="modal-actions">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setIsModalOpen(false);
            }}
            className="modal-btn cancel"
          >
            No, cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="modal-btn delete"
          >
            Yes, delete
          </button>
        </div>
      </section>
    </div>
  );
}

export default Modal;
