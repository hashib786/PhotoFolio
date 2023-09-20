import Button from "./components/Button";

// eslint-disable-next-line react/prop-types
function AlbumList({ albums, setIsCreateAlbum, isCreateAlbum }) {
  return (
    <div className="album-list-container">
      <div className="header">
        <h2>Your Albums</h2>
        <Button
          variant="outline"
          size="small"
          text={isCreateAlbum ? "Cancel" : "Add Album"}
          onClick={() => setIsCreateAlbum((prev) => !prev)}
          styled={{
            color: isCreateAlbum ? "red" : "#07f",
            backgroundColor: isCreateAlbum ? "#fcefef" : "#e6f7ff",
            border: `2px solid ${isCreateAlbum ? "red" : "#07f"}`,
          }}
        />
      </div>
      <div className="album-list">
        {/* eslint-disable-next-line react/prop-types */}
        {albums?.map((album, index) => (
          <div className="album-card" key={index}>
            <div className="album-image-container">
              <img
                src="https://stalwart-wisp-382f3c.netlify.app/assets/photos.png"
                alt="Album Cover"
                className="album-image"
              />
            </div>
            <p className="album-name">{Object.keys(album)[0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlbumList;
