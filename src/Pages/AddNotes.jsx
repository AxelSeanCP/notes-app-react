import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NotesContext } from "../Context/NotesContext";

const AddNotes = () => {
  const { addNote } = useContext(NotesContext);
  const [input, setInput] = useState({
    title: "",
    body: "",
    tags: [],
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, body, tags } = input;
    if (title !== "" && body !== "" && tags.length !== 0) {
      addNote(title, body, tags);
      navigate("/");
    } else {
      alert("Please fill out all the fields");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]:
        name === "tags" ? value.split(",").map((tag) => tag.trim()) : value,
    }));
  };

  const handleDiscard = () => {
    navigate("/");
  };

  return (
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
          placeholder="Note title"
          aria-label="Note title"
          style={{ fontSize: "3.6rem" }}
        />
      </div>

      <div className="mb-3 w-100">
        <input
          onChange={handleInput}
          type="text"
          name="tags"
          className="form-control border-0 text-secondary"
          placeholder="Tag 1, Tag 2, Tag 3"
          aria-label="Tags"
          style={{ fontSize: "1rem" }}
        />
      </div>

      <div className="mb-4 w-100">
        <textarea
          onChange={handleInput}
          name="body"
          className="form-control border-0 text-secondary"
          rows="10"
          placeholder="Write something nice..."
          style={{ resize: "none", fontSize: "1.2rem" }}
        ></textarea>
      </div>

      <div className="d-flex justify-content-start w-100">
        <button type="submit" className="btn btn-dark me-3">
          Save Note
        </button>
        <button onClick={handleDiscard} className="btn btn-outline-dark">
          Discard
        </button>
      </div>
    </form>
  );
};

export default AddNotes;
