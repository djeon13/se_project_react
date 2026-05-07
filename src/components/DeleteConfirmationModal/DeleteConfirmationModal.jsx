import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
}) {
  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="modal__content modal__content_type_confirm"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal__close"
          onClick={onClose}
        >
          ✕
        </button>

        <p className="modal__confirm-text">
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
        </p>

        <button
          className="modal__confirm-delete"
          onClick={onConfirm}
        >
          Yes, delete item
        </button>

        <button
          className="modal__cancel"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;