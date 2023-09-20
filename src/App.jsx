import AlbumForm from "./AlbumForm";
import Navbar from "./Navbar";
import Main from "./components/Main";

function App() {
  return (
    <>
      <Navbar />
      <Main>
        <AlbumForm />
      </Main>
    </>
  );
}

export default App;
