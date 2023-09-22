import { useState } from "react";
import toast from "react-hot-toast";
import db from "../firebase/DB";
import { deleteDoc, doc } from "firebase/firestore";

const ImageCard = ({ album, setIndex, setIsActive, i, deleteImage }) => {
  const [isActive, setIsActivated] = useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation();
    const toastId = toast.loading("Deleting image");
    try {
      await deleteDoc(doc(db, "images", album.id));
      deleteImage(album.id);
      toast.success("Deleted Successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div
      className="album-card"
      key={i}
      onClick={() => setIndex(i) || setIsActive(true)}
      onMouseEnter={() => setIsActivated(true)}
      onMouseLeave={() => setIsActivated(false)}
    >
      <img
        className={`essential edit ${isActive ? "" : "hide"}`}
        src="https://stalwart-wisp-382f3c.netlify.app/assets/edit.png"
        alt="edit"
      />
      <img
        onClick={handleDelete}
        className={`essential delete ${isActive ? "" : "hide"}`}
        src="https://stalwart-wisp-382f3c.netlify.app/assets/trash-bin.png"
        alt="delete"
      />
      <div className="album-image-container">
        <img src={album.imageUrl} alt="Album Cover" className="album-image" />
      </div>
      <p className="album-name">{album.imageName}</p>
    </div>
  );
};

export default ImageCard;
