import PropType from "prop-types";

const NotesActionButton = ({ onClick, icon, text }) => (
  <button
    type="button"
    className="btn btn-dark btn-lg rounded-sm position-fixed p-3"
    style={{ bottom: "20px", right: "20px" }}
    onClick={onClick}
  >
    <img
      src={icon}
      alt="an icon"
      style={{
        width: "20px",
        height: "20px",
        verticalAlign: "middle",
        marginRight: "10px",
      }}
    />
    {text}
  </button>
);

NotesActionButton.propTypes = {
  onClick: PropType.func.isRequired,
  icon: PropType.string.isRequired,
  text: PropType.string.isRequired,
};

export default NotesActionButton;
