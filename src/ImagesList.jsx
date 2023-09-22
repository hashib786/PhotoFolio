import { useEffect, useState } from "react";
import Button from "./components/Button";
import ImageForm from "./ImageForm";
import RoundButton from "./components/RoundButton";
import Carousel from "./carousel";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "./firebase/DB";
import Loading from "./components/Loading";
import toast from "react-hot-toast";
import ImageCard from "./components/ImageCard";

function ImageList({ currentAlbum, setAlbums, resetCurrentAlbums }) {
  const albumKey = Object.keys(currentAlbum)[0];
  const [isImageCreate, setIsImageCreate] = useState(false);
  const [images, setImages] = useState(currentAlbum[albumKey] || []);
  const [index, setIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Getting Data
    (async () => {
      const q = query(collection(db, "images"), where("album", "==", albumKey));
      const querySnapshot = await getDocs(q);
      let arr = [];
      querySnapshot.forEach((doc) => arr.push({ id: doc.id, ...doc.data() }));
      setImages(arr);
      setAlbums((prevAlbum) => {
        prevAlbum.forEach((ele, i) => {
          if (Object.keys(ele)[0] === albumKey) {
            prevAlbum[i][albumKey] = arr;
          }
        });
        return prevAlbum;
      });
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (currentAlbum[albumKey]) {
      let arr = currentAlbum[albumKey].filter((element) =>
        element.imageName.toLowerCase().startsWith(search.toLowerCase())
      );
      setImages(arr);
    }
  }, [search]);

  const addImage = async (data) => {
    // Add a new document with a generated id.
    if (data.error) {
      toast.dismiss(data.toastId);
      toast.error("Image Url Is not correct");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "images"), {
        album: albumKey,
        ...data,
      });
      setImages((prev) => {
        setAlbums((prevAlbum) => {
          prevAlbum.forEach((ele, i) => {
            if (Object.keys(ele)[0] === albumKey) {
              prevAlbum[i][albumKey] = [...prev, { id: docRef.id, ...data }];
            }
          });
          return prevAlbum;
        });

        return [...prev, { id: docRef.id, ...data }];
      });
      toast.success("Image Added successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      toast.dismiss(data.toastId);
    }
  };

  const deleteImage = (id) => {
    setImages((prev) => {
      return prev.filter((ele) => ele.id !== id);
    });
  };

  const updateImage = async ({ imageName, imageUrl, toastId, edit }) => {
    try {
      // update Data
      const washingtonRef = doc(db, "images", edit.id);
      await updateDoc(washingtonRef, {
        imageName,
        imageUrl,
        album: edit.album,
      });
      setImages((prev) => {
        return prev.map((ele) =>
          ele.id === edit.id
            ? { imageName, imageUrl, id: edit.id, album: edit.album }
            : ele
        );
      });
      handleAddCancel();
      toast.success("Image Updated Successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleAddCancel = () => {
    isImageCreate
      ? setIsImageCreate((prev) => !prev)
      : setEdit({}) || setIsImageCreate((prev) => !prev);
    isImageCreate || edit.imageUrl
      ? setEdit({}) || setIsImageCreate(false)
      : "";
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      {isActive && (
        <Carousel
          images={images}
          index={index}
          setIsActive={setIsActive}
          setIndex={setIndex}
        />
      )}
      {(isImageCreate || edit.imageUrl) && (
        <ImageForm addImage={addImage} edit={edit} updateImage={updateImage} />
      )}
      <div className="album-list-container">
        <div className="header">
          <div className="header__left">
            <RoundButton text={"←"} onClick={resetCurrentAlbums} />
            <h2>{albumKey}</h2>
          </div>
          <div className="header__right">
            <input
              type="text"
              className="searchBar"
              placeholder="Search..."
              onChange={handleSearch}
              value={search}
            />
            <Button
              variant="outline"
              size="small"
              text={isImageCreate || edit.imageUrl ? "Cancel" : "Add Image"}
              onClick={handleAddCancel}
              styled={{
                color: isImageCreate || edit.imageUrl ? "red" : "#07f",
                backgroundColor:
                  isImageCreate || edit.imageUrl ? "#fcefef" : "#e6f7ff",
                border: `2px solid ${
                  isImageCreate || edit.imageUrl ? "red" : "#07f"
                }`,
              }}
            />
          </div>
        </div>
        <div className="album-list">
          {Boolean(images.length) &&
            images?.map((album, i) => (
              <ImageCard
                key={album.id}
                album={album}
                setIndex={setIndex}
                setIsActive={setIsActive}
                deleteImage={deleteImage}
                setEdit={setEdit}
                i={i}
              />
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
