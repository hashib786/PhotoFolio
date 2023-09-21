import { useState } from "react";
import Button from "./components/Button";

function ImageForm({ addImage }) {
  const [imageName, setImageName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleInputChange = (event) => {
    setImageName(event.target.value);
  };
  const handleInputChange2 = (event) => {
    setImageUrl(event.target.value);
  };

  const handleCreateAlbum = (e) => {
    e.preventDefault();
    addImage({ imageName, imageUrl, id: Date.now() });
    setImageName("") || setImageUrl("");
  };

  return (
    <div className="album-form-container">
      <div className="form-header">
        <h2>Add image to project</h2>
      </div>
      <form className="album-form" onSubmit={handleCreateAlbum}>
        <input
          type="text"
          placeholder="Title"
          value={imageName}
          onChange={handleInputChange}
          className="album-input"
          minLength={5}
          maxLength={25}
          required={true}
        />
        <input
          type="url"
          placeholder="Image Url"
          value={imageUrl}
          onChange={handleInputChange2}
          className="album-input"
          required={true}
        />
        <div className="button-container">
          <Button
            variant="fill"
            size="medium"
            text="Clear"
            textColor="#fff"
            bgColor="#ff1300"
            onClick={() => setImageName("") || setImageUrl("")}
          />
          <Button
            variant="fill"
            size="medium"
            text="Add"
            textColor="#fff"
            bgColor="#07f"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}

export default ImageForm;
