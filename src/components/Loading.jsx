import Spinner from "react-spinner-material";

const Loading = () => {
  return (
    <div className="loading">
      <Spinner radius={50} color={"#0c22e9"} stroke={5} visible={true} />
    </div>
  );
};

export default Loading;
