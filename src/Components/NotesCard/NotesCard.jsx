import { Link } from "react-router-dom";
import PropType from "prop-types";
import "./NotesCard.css";

const NotesCard = (props) => {
  const { id, title, body, tags, createdAt } = props;

  return (
    <div className="col-md-4 mb-4">
      <Link to={`/notes/${id}`} style={{ textDecoration: "none" }}>
        <div className="card h-100 border border-secondary rounded">
          <div className="card-body">
            <h2 className="card-title fw-bold">{title}</h2>
            <p className="card-subtitle mb-3">
              Created at {new Date(createdAt).toDateString()}
            </p>
            <p className="card-text">{body}</p>
            <div className="tags">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="card-link badge text-bg-light border border-secondary me-1"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

NotesCard.propTypes = {
  id: PropType.string.isRequired,
  title: PropType.string.isRequired,
  body: PropType.string.isRequired,
  tags: PropType.arrayOf(PropType.string).isRequired,
  createdAt: PropType.string.isRequired,
};

export default NotesCard;
