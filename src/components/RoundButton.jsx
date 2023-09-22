const RoundButton = ({ text, className, onClick = () => {} }) => {
  return (
    <button className={`round__btn ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default RoundButton;
