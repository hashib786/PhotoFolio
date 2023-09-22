import { useState } from "react";
import Button from "./components/Button";
import ImageForm from "./ImageForm";
import RoundButton from "./components/RoundButton";
import Carousel from "./carousel";

function ImageList({ currentAlbum, setAlbums, resetCurrentAlbums }) {
  const albumKey = Object.keys(currentAlbum)[0];
  const [isImageCreate, setIsImageCreate] = useState(false);
  const [images, setImages] = useState(currentAlbum[albumKey] || []);
  const [index, setIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const addImage = (data) => {
    setImages((prev) => {
      setAlbums((prevAlbum) => {
        prevAlbum.forEach((ele, i) => {
          if (Object.keys(ele)[0] === albumKey) {
            prevAlbum[i][albumKey] = [...prev, data];
          }
        });
        return prevAlbum;
      });

      return [...prev, data];
    });
  };

  return (
    <>
      {isActive && (
        <Carousel
          images={images}
          index={index}
          setIsActive={setIsActive}
          setIndex={setIndex}
        />
      )}
      {isImageCreate && <ImageForm addImage={addImage} />}
      <div className="album-list-container">
        <div className="header">
          <div className="header__left">
            <RoundButton text={"←"} onClick={resetCurrentAlbums} />
            <h2>{albumKey}</h2>
          </div>
          <div className="header__right">
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
        </div>
        <div className="album-list">
          {Boolean(images.length) &&
            images?.map((album, i) => (
              <div
                className="album-card"
                key={i}
                onClick={() => setIndex(i) || setIsActive(true)}
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
