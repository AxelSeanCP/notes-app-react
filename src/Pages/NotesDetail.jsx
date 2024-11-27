import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { NotesContext } from "../Context/NotesContext";
import pencilIcon from "../assets/pencil_icon.png";
import Loader from "../Components/Loader/Loader";
import NotesActionButton from "../Components/NotesActionButton/NotesActionButton";

const NotesDetail = () => {
  const { noteId } = useParams();
  const { getNoteById } = useContext(NotesContext);
  const [note, setNote] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchNote = async () => {
      const fetchedNote = await getNoteById(noteId);
      if (fetchedNote) {
        setNote(fetchedNote);
      }
      setIsLoading(false);
    };

    fetchNote();
  }, [noteId, getNoteById, location]);

  const handleEditNote = () => {
    navigate(`/notes/${noteId}/edit`, { state: note });
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <form
          className="container mt-5 d-flex flex-column align-items-center"
          style={{ maxWidth: "800px" }}
        >
          <div className="mb-3 w-100">
            <input
              type="text"
              disabled
              readOnly
              className="form-control-plaintext form-control-lg p-1 border-0 fw-bold"
              aria-label="Note title"
              value={note.title}
              style={{ fontSize: "3.6rem" }}
            />
          </div>

          <div className="mb-2 w-100">
            <p className="mb-1">
              Created At: {new Date(note.createdAt).toDateString()}
            </p>
            <p className="mb-0">Owned by {note.username}</p>
          </div>

          <div className="mb-3 w-100">
            <input
              type="text"
              disabled
              readOnly
              className="form-control-plaintext border-0 "
              value={note.tags.join(", ")}
              style={{ fontSize: "1rem" }}
            />
          </div>

          <div className="mb-4 w-100">
            <textarea
              disabled
              readOnly
              className="form-control-plaintext border-0"
              rows="10"
              value={note.body}
              style={{ resize: "none", fontSize: "1.2rem" }}
            ></textarea>
          </div>

          <NotesActionButton
            onClick={handleEditNote}
            icon={pencilIcon}
            text={"Edit Note"}
          />
        </form>
      )}
    </div>
  );
};

export default NotesDetail;
