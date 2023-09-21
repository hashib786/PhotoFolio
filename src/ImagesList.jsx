import { useState } from "react";
import Button from "./components/Button";
import ImageForm from "./ImageForm";

function ImageList({ currentAlbum, setAlbums }) {
  const albumKey = Object.keys(currentAlbum)[0];
  const [isImageCreate, setIsImageCreate] = useState(false);
  const [images, setImages] = useState(currentAlbum[albumKey] || []);

  const addImage = (data) => {
    setImages((prev) => {
      setAlbums((prevAlbum) => {
        prevAlbum.forEach((ele, i) => {
          if (Object.keys(ele)[0] === albumKey) {
            prevAlbum[i][albumKey] = [...prev, data];
          }
        });
        console.log(prevAlbum);
        return prevAlbum;
      });

      return [...prev, data];
    });
  };

  return (
    <>
      {isImageCreate && <ImageForm addImage={addImage} />}
      <div className="album-list-container">
        <div className="header">
          <h2>{albumKey}</h2>
          <Button
            variant="outline"
            size="small"
            text={isImageCreate ? "Cancel" : "Add Image"}
            onClick={() => setIsImageCreate((prev) => !prev)}
            styled={{
              color: isImageCreate ? "red" : "#07f",
              backgroundColor: isImageCreate ? "#fcefef" : "#e6f7ff",
              border: `2px solid ${isImageCreate ? "red" : "#07f"}`,
            }}
          />
        </div>
        <div className="album-list">
          {Boolean(images.length) &&
            images?.map((album, index) => (
              <div
                className="album-card"
                key={index}
                onClick={() =>
                  setCurrentAlbum(album) || setisImageCreate(false)
                }
              >
                <div className="album-image-container">
                  <img
                    src={album.imageUrl}
                    alt="Album Cover"
                    className="album-image"
                  />
                </div>
                <p className="album-name">{album.imageName}</p>
              </div>
            ))}
        </div>
        {!Boolean(images.length) && (
          <h1 style={{ textAlign: "center" }}>No Image Found</h1>
        )}
      </div>
    </>
  );
}

export default ImageList;
