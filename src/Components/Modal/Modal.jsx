import PropType from "prop-types";

const Modal = ({ confirmDelete, isDeleting }) => {
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Delete Note?
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete this note?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-dark"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-outline-dark"
              data-bs-dismiss="modal"
              onClick={confirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting...." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  confirmDelete: PropType.func.isRequired,
  isDeleting: PropType.bool.isRequired,
};

export default Modal;
