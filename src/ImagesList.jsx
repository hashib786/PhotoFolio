import { useEffect, useState } from "react";
import Button from "./components/Button";
import ImageForm from "./ImageForm";
import RoundButton from "./components/RoundButton";
import Carousel from "./carousel";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import db from "./firebase/DB";
import Loading from "./components/Loading";

function ImageList({ currentAlbum, setAlbums, resetCurrentAlbums }) {
  const albumKey = Object.keys(currentAlbum)[0];
  const [isImageCreate, setIsImageCreate] = useState(false);
  const [images, setImages] = useState(currentAlbum[albumKey] || []);
  const [index, setIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Getting Data
    (async () => {
      const q = query(collection(db, "images"), where("album", "==", albumKey));
      const querySnapshot = await getDocs(q);
      let arr = [];
      querySnapshot.forEach((doc) => arr.push({ id: doc.id, ...doc.data() }));
      setImages(arr);
      setLoading(false);
    })();
  }, []);

  const addImage = async (data) => {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "images"), {
      album: albumKey,
      ...data,
    });
    console.log("Document written with ID: ", docRef.id);
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
