import Cards from "./Components/Cards";
import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import AddMovie from "./Components/AddMovie";
import Details from "./Components/Details";
import { createContext, useState } from "react";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

const Appstate = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");
  return (
    <Appstate.Provider value={{login, userName, setLogin, setUserName}}>
      <div className="App relative">
        <Header />
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/addmovie" element={<AddMovie />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate}