/* ============================================================
   Goodbite — Modal UI Component
   ============================================================ */
export const Modal = ({ isOpen, onClose, children, title, className = '' }) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="backdrop" onClick={onClose} />
      <div className={`modal ${className}`} role="dialog" aria-modal="true">
        {title && (
          <div className="modal-header">
            <h3 className="font-semibold text-base">{title}</h3>
            <button
              type="button"
              className="close-btn"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        )}
        <div className="modal-body">{children}</div>
      </div>
    </>
  );
};

export default Modal;
