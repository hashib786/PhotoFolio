import { useEffect, useState } from "react";
import AlbumForm from "./AlbumForm";
import Navbar from "./Navbar";
import Main from "./components/Main";
import AlbumList from "./AlbumsList";
import ImageList from "./ImagesList";
import Loading from "./components/Loading";
import db from "./firebase/DB";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

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

  const addAlbum = async (album) => {
    const toastId = toast.loading("Creating Rewiev...");
    let isAvailable = false;
    albums.forEach((ele) => (ele === album ? (isAvailable = true) : ""));
    if (isAvailable) {
      toast.error(album + " is already available");
      toast.dismiss(toastId);
      return;
    }

    // Setting Data
    try {
      await setDoc(doc(db, "albums", album), {
        [album]: album,
      });

      setAlbums((prev) => [...prev, { [album]: null }]);
      toast.success("album created successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const resetCurrentAlbums = () => {
    setCurrentAlbum(null);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar resetCurrentAlbums={resetCurrentAlbums} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Toaster position="top-right" reverseOrder={false} />
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
        </>
      )}
    </>
  );
}

export default App;
