import { useState } from "react";

const ImageCard = ({ album, setIndex, setIsActive, i }) => {
  const [isActive, setIsActivated] = useState(false);
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
