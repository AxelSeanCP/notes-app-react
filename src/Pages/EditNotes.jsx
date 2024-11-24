import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NotesContext } from "../Context/NotesContext";
import Modal from "../Components/Modal/Modal";

const EditNotes = () => {
  const { noteId } = useParams();
  const { editNote, deleteNote } = useContext(NotesContext);
  const [input, setInput] = useState({
    title: "",
    body: "",
    tags: [],
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const note = location.state;

  useEffect(() => {
    if (note) {
      setInput({
        title: note.title || "",
        body: note.body || "",
        tags: note.tags || [],
      });
    }
  }, [note]);

  if (!note) {
    return <h1>No note data available</h1>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, body, tags } = input;
    if (title !== "" && body !== "" && tags.length !== 0) {
      editNote(noteId, title, body, tags);
      navigate("/");
    } else {
      alert("Please fill out all the fields");
    }
  };

  const confirmDelete = async () => {
    setIsDeleting(true);

    try {
      await deleteNote(noteId);
      navigate("/");
    } catch (error) {
      console.error("Error deleting note: ", error);
      alert("Failed to delete note. Please try again");
    }

    setIsDeleting(false);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]:
        name === "tags" ? value.split(",").map((tag) => tag.trim()) : value,
    }));
  };

  return (
    <div>
      <Modal confirmDelete={confirmDelete} isDeleting={isDeleting} />
      <form
        onSubmit={handleSubmit}
        className="container mt-5 d-flex flex-column align-items-center"
        style={{ maxWidth: "800px" }}
      >
        <div className="mb-3 w-100">
          <input
            onChange={handleInput}
            type="text"
            name="title"
            className="form-control form-control-lg p-2 border-0 fw-bold"
            aria-label="Note title"
            value={input.title}
            style={{ fontSize: "3.6rem" }}
          />
        </div>

        <div className="mb-3 w-100">
          <input
            onChange={handleInput}
            type="text"
            name="tags"
            className="form-control border-0"
            aria-label="Tags"
            value={input.tags.join(", ")}
            style={{ fontSize: "1rem" }}
          />
        </div>

        <div className="mb-4 w-100">
          <textarea
            onChange={handleInput}
            name="body"
            className="form-control border-0"
            rows="10"
            value={input.body}
            style={{ resize: "none", fontSize: "1.2rem" }}
          ></textarea>
        </div>

        <div className="d-flex justify-content-start w-100">
          <button type="submit" className="btn btn-dark me-3">
            Save Note
          </button>
          <button
            type="button"
            className="btn btn-outline-dark"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Delete Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNotes;
