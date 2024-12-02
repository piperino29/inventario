import { Route, Routes } from "react-router-dom";
import NavbarNav from "./components/NavbarNav";
import Home from "./pages/Home";
import Inventario from "./pages/Inventario";

function App() {

  return (
    <div className="content p-10 w-100">
      <NavbarNav/>
      <Routes>
        <Route path="/" element={<Home/>}
        />
        <Route path="/Inventario" element={<Inventario/>}
        />
      </Routes>
    </div>
  );
}

export default App
