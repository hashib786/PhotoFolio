const RoundButton = ({ text, onClick = () => {} }) => {
  return (
    <button className="round__btn" onClick={onClick}>
      {text}
    </button>
  );
};

export default RoundButton;
