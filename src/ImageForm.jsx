import { useEffect, useState } from "react";
import Button from "./components/Button";
import toast from "react-hot-toast";

function ImageForm({ addImage, edit, updateImage }) {
  // State to store the image name and URL
  const [imageName, setImageName] = useState(edit.imageName);
  const [imageUrl, setImageUrl] = useState(edit.imageUrl);

  // useEffect to update the input fields when editing an image
  useEffect(() => {
    setImageName(edit.imageName);
    setImageUrl(edit.imageUrl);
  }, [edit]);

  // Function to handle input changes for image name
  const handleInputChange = (event) => {
    setImageName(event.target.value);
  };

  // Function to handle input changes for image URL
  const handleInputChange2 = (event) => {
    setImageUrl(event.target.value);
  };

  // Function to handle image creation/update when the form is submitted
  const handleCreateAlbum = (e) => {
    e.preventDefault();
    const toastId = toast.loading(
      `${edit.imageUrl ? "Updating" : "Creating"} Image...`
    );

    // Create an image element to check if the image URL is valid
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      if (edit.imageUrl) {
        // If editing an image, call the updateImage function
        updateImage({ imageName, imageUrl, toastId, edit });
        return;
      }
      // If adding a new image, call the addImage function
      addImage({ imageName, imageUrl, toastId });
      setImageName("") || setImageUrl("");
    };

    img.onerror = () => {
      // Handle the case where the image URL is not valid
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
          {/* Clear button to reset the input fields */}
          <Button
            variant="fill"
            size="medium"
            text="Clear"
            textColor="#fff"
            bgColor="#ff1300"
            onClick={() => setImageName("") || setImageUrl("")}
          />
          {/* Edit or Add button depending on whether editing an image */}
          <Button
            variant="fill"
            size="medium"
            text={`${edit.imageUrl ? "Edit" : "Add"}`}
            textColor="#fff"
            bgColor={`${edit.imageUrl ? "#2bda08" : "#07f"}`}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}

export default ImageForm;
