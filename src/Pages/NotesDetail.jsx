import { useParams } from "react-router-dom";
import { useContext } from "react";
import { NotesContext } from "../Context/NotesContext";

const NotesDetail = () => {
  const { noteId } = useParams();

  return <h1>Coming soon {noteId}</h1>;
};

export default NotesDetail;
