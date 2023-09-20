import Navbar from "./Navbar";
import Button from "./components/Button";

function App() {
  return (
    <>
      <Navbar />
      <Button
        variant="fill"
        size="medium"
        text="Click me"
        onClick={() => console.log("Button clicked")}
      />
      <Button
        variant="outline"
        size="small"
        text="Outline"
        bgColor="#ff58330"
        textColor="#ffffff"
      />
    </>
  );
}

export default App;
