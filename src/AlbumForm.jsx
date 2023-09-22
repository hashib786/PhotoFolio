import { useState } from "react";
import Button from "./components/Button";

function AlbumForm({ addAlbum }) {
  // State to store the album name entered by the user
  const [albumName, setAlbumName] = useState("");

  // Function to handle input changes and update the albumName state
  const handleInputChange = (event) => {
    setAlbumName(event.target.value);
  };

  // Function to handle album creation when the form is submitted
  const handleCreateAlbum = (e) => {
    e.preventDefault();

    // Trim the album name and check if it's empty
    if (!albumName.trim()) return;

    // Call the addAlbum function to create a new album with the entered name
    addAlbum(albumName);

    // Clear the input field after creating the album
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
          minLength={5}
          maxLength={25}
          required={true}
        />
        <div className="button-container">
          {/* Clear button to reset the input field */}
          <Button
            variant="fill"
            size="medium"
            text="Clear"
            textColor="#fff"
            bgColor="#ff1300"
            onClick={() => setAlbumName("")}
          />
          {/* Create button to submit the form and create the album */}
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
