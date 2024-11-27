import NotesCard from "../Components/NotesCard/NotesCard";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NotesContext } from "../Context/NotesContext";
import plusIcon from "../assets/plus_icon.png";
import Loader from "../Components/Loader/Loader";
import NotesActionButton from "../Components/NotesActionButton/NotesActionButton";

const NotesView = () => {
  const { getNotes } = useContext(NotesContext);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 300));

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
        <Loader />
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

      <NotesActionButton
        onClick={handleAddNote}
        icon={plusIcon}
        text={"Add Note"}
      />
    </div>
  );
};

export default NotesView;
