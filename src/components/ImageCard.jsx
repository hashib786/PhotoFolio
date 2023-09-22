import { useState } from "react";
import toast from "react-hot-toast";
import db from "../firebase/DB";
import { deleteDoc, doc } from "firebase/firestore";

const ImageCard = ({
  album,
  setIndex,
  setIsActive,
  i,
  deleteImage,
  setEdit,
}) => {
  // State to track whether edit and delete icons should be visible on hover
  const [isActive, setIsActivated] = useState(false);

  // Handle the delete action for the image
  const handleDelete = async (e) => {
    e.stopPropagation();
    const toastId = toast.loading("Deleting image");
    try {
      // Delete the image document from Firestore
      await deleteDoc(doc(db, "images", album.id));
      // Remove the image from the UI
      deleteImage(album.id);
      toast.success("Deleted Successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  // Handle the edit action for the image
  const handleEdit = (e) => {
    e.stopPropagation();
    // Set the selected image for editing
    setEdit(album);
  };

  return (
    <div
      className="album-card"
      key={i}
      onClick={() => setIndex(i) || setIsActive(true)}
      onMouseEnter={() => setIsActivated(true)}
      onMouseLeave={() => setIsActivated(false)}
    >
      {/* Edit icon */}
      <img
        onClick={handleEdit}
        className={`essential edit ${isActive ? "" : "hide"}`}
        src="https://stalwart-wisp-382f3c.netlify.app/assets/edit.png"
        alt="edit"
      />
      {/* Delete icon */}
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
