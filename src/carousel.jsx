import RoundButton from "./components/RoundButton";

const Carousel = ({ setIsActive, index, setIndex, images }) => {
  // Get the current image to display in the carousel
  const currentImage = images[index];

  // Function to stop event propagation (e.g., click events)
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  // Function to increase the image index
  const increaseIndex = (e) => {
    e.stopPropagation();
    setIndex((prev) => ++prev);
  };

  // Function to decrease the image index
  const decreaseIndex = (e) => {
    e.stopPropagation();
    setIndex((prev) => --prev);
  };

  return (
    <div className="overlay" onClick={() => setIsActive(false)}>
      <div className="overlay__header" onClick={stopPropagation}>
        {/* Display the current image's name */}
        <h1>{currentImage.imageName}</h1>
        {/* Button to close the carousel */}
        <RoundButton text="✖" onClick={() => setIsActive(false)} />
      </div>
      {/* Display a left arrow button to go to the previous image */}
      {index !== 0 && (
        <RoundButton text="←" className={"absolute"} onClick={decreaseIndex} />
      )}
      {/* Display a right arrow button to go to the next image */}
      {index < images.length - 1 && (
        <RoundButton
          text="→"
          className={"absolute right"}
          onClick={increaseIndex}
        />
      )}
      {/* Display the current image */}
      <img
        src={currentImage.imageUrl}
        alt="hello"
        className="carousel__img"
        onClick={stopPropagation}
      />
    </div>
  );
};

export default Carousel;
