import NotesCard from "../Components/NotesCard/NotesCard";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NotesContext } from "../Context/NotesContext";
import plusIcon from "../assets/plus_icon.png";

const NotesView = () => {
  const { getNotes } = useContext(NotesContext);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchNotes = async () => {
      const fetchedNotes = await getNotes();
      if (fetchedNotes) {
        setNotes(fetchedNotes);
      }
      setIsLoading(false);
    };

    fetchNotes();
  }, [getNotes, location]);

  const handleAddNote = () => {
    navigate("/notes/new");
  };

  return (
    <div>
      {isLoading ? (
        <h3>Loading notes....</h3>
      ) : (
        <div>
          {notes.length > 0 ? (
            <div className="container-fluid mt-4">
              <div className="row g-3">
                {notes.map((note) => (
                  <NotesCard
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    body={note.body}
                    tags={note.tags}
                    createdAt={note.createdAt}
                  />
                ))}
              </div>
            </div>
          ) : (
            <h3 className="text-center h3">No notes available</h3>
          )}
        </div>
      )}

      <button
        type="button"
        className="btn btn-dark btn-lg rounded-sm position-fixed p-3"
        style={{ bottom: "20px", right: "20px" }}
        onClick={handleAddNote}
      >
        <img
          src={plusIcon}
          alt="plus icon"
          style={{
            width: "20px",
            height: "20px",
            verticalAlign: "middle",
            marginRight: "10px",
          }}
        />{" "}
        Add Note
      </button>
    </div>
  );
};

export default NotesView;
