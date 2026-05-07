import { useEffect } from "react";
import "./ItemModal.css";

function ItemModal({ isOpen, onClose, item, onDelete }) {


  useEffect(() => {
    if (!isOpen) return;

    function handleEsc(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

return (
  <div
    className={`modal ${isOpen ? "modal_is-opened" : ""}`}
    onClick={onClose}
  >
    <div
      className="modal__content"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="modal__close"
        onClick={onClose}
      >
        ✕
      </button>

      {item && (
        <div className="modal__card">
          <img
            className="modal__image"
            src={item.link}
            alt={item.name}
          />

          <div className="modal__footer">
            <div className="modal__header-row">
              <h2 className="modal__item-name">
                {item.name}
              </h2>

              <button
                className="modal__delete-btn"
                onClick={() => onDelete(item)}
              >
                Delete item
              </button>
            </div>

            <p className="modal__weather">
              Weather: {item.weather}
            </p>
          </div>
        </div>
      )}
    </div>
  </div>
);
}


export default ItemModal;