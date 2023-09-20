import { useState } from "react";
import AlbumForm from "./AlbumForm";
import Navbar from "./Navbar";
import Main from "./components/Main";
import AlbumList from "./AlbumsList";

function App() {
  const [isCreateAlbum, setIsCreateAlbum] = useState(false);
  const [albums, setAlbums] = useState([
    "Memories of Summer",
    "Infinite Dreams",
    "Serenade of Stars",
    "Echoes of Time",
    "Twilight Harmony",
    "Enchanted Melodies",
    "Whispers in the Wind",
    "Dancing in the Rain",
    "Lost in Paradise",
    "Golden Moments",
  ]);

  return (
    <>
      <Navbar />
      <Main>
        {isCreateAlbum && <AlbumForm />}
        <AlbumList
          albums={albums}
          setIsCreateAlbum={setIsCreateAlbum}
          isCreateAlbum={isCreateAlbum}
        />
      </Main>
    </>
  );
}

export default App;
