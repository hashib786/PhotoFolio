import { useState } from "react";
import Button from "./components/Button";
import toast from "react-hot-toast";

function ImageForm({ addImage, name, url }) {
  const [imageName, setImageName] = useState(name);
  const [imageUrl, setImageUrl] = useState(url);

  const handleInputChange = (event) => {
    setImageName(event.target.value);
  };
  const handleInputChange2 = (event) => {
    setImageUrl(event.target.value);
  };

  const handleCreateAlbum = (e) => {
    e.preventDefault();
    const toastId = toast.loading("Creating Image...");

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      addImage({ imageName, imageUrl, toastId });
      setImageName("") || setImageUrl("");
    };

    img.onerror = () => {
      addImage({ imageName, imageUrl, error: true, toastId });
    };
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
            text={`${url ? "Edit" : "Add"}`}
            textColor="#fff"
            bgColor={`${url ? "#2bda08" : "#07f"}`}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}

export default ImageForm;
