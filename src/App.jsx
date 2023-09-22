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

function App() {
  const [isCreateAlbum, setIsCreateAlbum] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Getting Data from Firestore
    (async () => {
      const data = await getDocs(collection(db, "albums"));
      let arr = [];
      data.forEach((doc) => arr.push({ [doc.id]: [] }));
      setAlbums(arr);
      setLoading(false);
    })();
  }, []);

  const addAlbum = async (album) => {
    const toastId = toast.loading("Creating Album...");
    let isAvailable = false;

    // Check if the album name is already available in the local state
    albums.forEach((ele) => (ele === album ? (isAvailable = true) : ""));

    if (isAvailable) {
      toast.error(album + " is already available");
      toast.dismiss(toastId);
      return;
    }

    // Set Data in Firestore
    try {
      await setDoc(doc(db, "albums", album), {
        [album]: album,
      });

      // Update the local state with the newly created album
      setAlbums((prev) => [...prev, { [album]: [] }]);
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
      {/* Toaster for displaying toast messages */}
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar resetCurrentAlbums={resetCurrentAlbums} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Main>
            {!currentAlbum ? (
              <>
                {/* Render AlbumForm when creating an album */}
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
