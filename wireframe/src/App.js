import { Route, Routes } from "react-router-dom";
import Footer from "./Component/Footer";
import Home from "./Component/Home";
import Navbar from "./Component/Navbar";

function App() {


  return (
    <>
      <section className="container-fluid">
        <Navbar></Navbar>
        <Home></Home>
        <Footer></Footer>
      </section>
    </>
  );
}

export default App;
