import { useContext, useState } from "react";
import PropType from "prop-types";
import { NotesContext } from "../../Context/NotesContext";
import "./AddCollaborator.css";

const AddCollaborator = ({ noteId }) => {
  const { searchUser, addCollaborator, deleteCollaborator } =
    useContext(NotesContext);
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = async (e) => {
    const { value } = e.target;
    setQuery(value);

    if (value.trim()) {
      const usersResult = await searchUser(value);
      setUsers(usersResult);
      setShowDropdown(true);
    } else {
      setUsers([]);
      setShowDropdown(false);
    }
  };

  const handleUserSelect = (user) => {
    console.log("selected user: ", user);
    setQuery(user.id);
    setShowDropdown(false);
  };

  const handleAddCollaborator = () => {
    addCollaborator(noteId, query);
  };

  const handleDeleteCollaborator = () => {
    deleteCollaborator(noteId, query);
  };

  return (
    <div className="card h-100 w-100 custom-border rounded mb-3">
      <div className="card-body">
        <div className="card-title fw-bold h3">Collaboration</div>
        <div className="card-subtitle mb-3">User Id</div>
        <input
          type="text"
          onChange={handleSearch}
          value={query}
          className="form-control p-2 border-bottom"
          placeholder="Search by Username to get user id"
        />
        {showDropdown && users.length > 0 && (
          <ul
            className="dropdown-menu show w-100"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            {users.map((user) => (
              <li key={user.id}>
                <button
                  className="dropdown-item"
                  onClick={() => handleUserSelect(user)}
                >
                  {user.id} - {user.username}
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="d-flex justify-content-start w-100 mt-3">
          <button className="btn btn-dark me-3" onClick={handleAddCollaborator}>
            Add
          </button>
          <button className="btn btn-dark" onClick={handleDeleteCollaborator}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

AddCollaborator.propTypes = {
  noteId: PropType.string.isRequired,
};

export default AddCollaborator;
