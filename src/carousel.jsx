import RoundButton from "./components/RoundButton";

const Carousel = ({ setIsActive, index }) => {
  const stopPropagate = (e) => {
    e.stopPropagation();
  };
  return (
    <div className="overly" onClick={() => setIsActive(false)}>
      <div className="overly__header" onClick={stopPropagate}>
        <h1>hello world</h1>
        <RoundButton text="✖" onClick={() => setIsActive(false)} />
      </div>
      {index !== 0 && <RoundButton text="←" className={"absolute"} />}
      <RoundButton text="→" className={"absolute right"} />
      <img
        src="https://stalwart-wisp-382f3c.netlify.app/assets/logo.png"
        alt="hello"
        className="carousel__img"
        onClick={stopPropagate}
      />
    </div>
  );
};

export default Carousel;
