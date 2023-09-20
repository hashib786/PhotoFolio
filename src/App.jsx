import { useState } from "react";
import AlbumForm from "./AlbumForm";
import Navbar from "./Navbar";
import Main from "./components/Main";
import AlbumList from "./AlbumsList";

const TEMP = [
  { "Memories of Summer": null },
  { "Infinite Dreams": null },
  { "Serenade of Stars": null },
  { "Echoes of Time": null },
  { "Twilight Harmony": null },
  { "Enchanted Melodies": null },
  { "Whispers in the Wind": null },
  { "Dancing in the Rain": null },
  { "Lost in Paradise": null },
  { "Golden Moments": null },
];

function App() {
  const [isCreateAlbum, setIsCreateAlbum] = useState(false);
  const [albums, setAlbums] = useState(TEMP);
  const [currentAlbum, setCurrentAlbum] = useState(null);

  const addAlbum = (album) => {
    let isAvailable = false;
    albums.forEach((ele) => (ele === album ? (isAvailable = true) : ""));
    if (isAvailable) return;
    setAlbums((prev) => [...prev, album]);
  };

  return (
    <>
      <Navbar />
      <Main>
        {!currentAlbum ? (
          <>
            {isCreateAlbum && <AlbumForm addAlbum={addAlbum} />}
            <AlbumList
              albums={albums}
              setIsCreateAlbum={setIsCreateAlbum}
              isCreateAlbum={isCreateAlbum}
              setCurrentAlbum={setCurrentAlbum}
            />
          </>
        ) : null}
      </Main>
    </>
  );
}

export default App;
