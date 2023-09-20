import { useState } from "react";
import Button from "./components/Button";

// eslint-disable-next-line react/prop-types
function AlbumForm({ addAlbum }) {
  const [albumName, setAlbumName] = useState("");

  const handleInputChange = (event) => {
    setAlbumName(event.target.value);
  };

  const handleCreateAlbum = (e) => {
    e.preventDefault();
    if (!albumName.trim()) return;
    addAlbum(albumName);
    setAlbumName("");
  };

  return (
    <div className="album-form-container">
      <div className="form-header">
        <h2>Create an Album</h2>
      </div>
      <form className="album-form" onSubmit={handleCreateAlbum}>
        <input
          type="text"
          placeholder="Enter album name"
          value={albumName}
          onChange={handleInputChange}
          className="album-input"
        />
        <div className="button-container">
          <Button
            variant="fill"
            size="medium"
            text="Clear"
            textColor="#fff"
            bgColor="#ff1300"
            onClick={() => setAlbumName("")}
          />
          <Button
            variant="fill"
            size="medium"
            text="Create"
            textColor="#fff"
            bgColor="#07f"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}

export default AlbumForm;
