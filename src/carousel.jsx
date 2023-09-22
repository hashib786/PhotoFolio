import RoundButton from "./components/RoundButton";

const Carousel = ({ setIsActive, index, setIndex, images }) => {
  const currentImage = images[index];
  const stopPropagate = (e) => {
    e.stopPropagation();
  };

  const increase = (e) => {
    e.stopPropagation();
    setIndex((prev) => ++prev);
  };
  const decrease = (e) => {
    e.stopPropagation();
    setIndex((prev) => --prev);
  };
  return (
    <div className="overly" onClick={() => setIsActive(false)}>
      <div className="overly__header" onClick={stopPropagate}>
        <h1>{currentImage.imageName}</h1>
        <RoundButton text="✖" onClick={() => setIsActive(false)} />
      </div>
      {index !== 0 && (
        <RoundButton text="←" className={"absolute"} onClick={decrease} />
      )}
      {index < images.length - 1 && (
        <RoundButton text="→" className={"absolute right"} onClick={increase} />
      )}
      <img
        src={currentImage.imageUrl}
        alt="hello"
        className="carousel__img"
        onClick={stopPropagate}
      />
    </div>
  );
};

export default Carousel;
