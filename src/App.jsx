import { useEffect, useState } from "react";
import AlbumForm from "./AlbumForm";
import Navbar from "./Navbar";
import Main from "./components/Main";
import AlbumList from "./AlbumsList";
import ImageList from "./ImagesList";
import Loading from "./components/Loading";
import db from "./firebase/DB";
import { collection, getDocs } from "firebase/firestore";

const TEMP = [
  { "Memories of Summer": [] },
  { "Infinite Dreams": [] },
  { "Serenade of Stars": [] },
  { "Echoes of Time": [] },
  { "Twilight Harmony": [] },
  { "Enchanted Melodies": [] },
  { "Whispers in the Wind": [] },
  { "Dancing in the Rain": [] },
  { "Lost in Paradise": [] },
  { "Golden Moments": [] },
];

function App() {
  const [isCreateAlbum, setIsCreateAlbum] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Getting Data
    (async () => {
      const data = await getDocs(collection(db, "albums"));
      let arr = [];
      data.forEach((doc) => arr.push({ [doc.id]: [] }));
      setAlbums(arr);
      setLoading(false);
    })();
  }, []);

  const addAlbum = (album) => {
    console.log(album);
    let isAvailable = false;
    albums.forEach((ele) => (ele === album ? (isAvailable = true) : ""));
    if (isAvailable) return;
    console.log(album);
    setAlbums((prev) => [...prev, { [album]: null }]);
  };

  const resetCurrentAlbums = () => {
    setCurrentAlbum(null);
  };

  return (
    <>
      <Navbar resetCurrentAlbums={resetCurrentAlbums} />
      {loading ? (
        <Loading />
      ) : (
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
          ) : (
            <ImageList
              currentAlbum={currentAlbum}
              setAlbums={setAlbums}
              resetCurrentAlbums={resetCurrentAlbums}
            />
          )}
        </Main>
      )}
    </>
  );
}

export default App;
