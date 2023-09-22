import RoundButton from "./components/RoundButton";

const Carousel = () => {
  return (
    <div className="overly">
      <div className="overly__header">
        <h1>hello world</h1>
        <RoundButton text="✖" />
      </div>
      <RoundButton text="←" className={"absolute"} />
      <RoundButton text="→" className={"absolute right"} />
      <img
        src="https://stalwart-wisp-382f3c.netlify.app/assets/logo.png"
        alt="hello"
        className="carousel__img"
      />
    </div>
  );
};

export default Carousel;
