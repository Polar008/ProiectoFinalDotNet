//import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import ContextUser from "./controllers/ContextUser";
import { useEffect, useState } from "react";

function App() {
  const [jwt, setJwt] = useState("");
  const [points, setPoints] = useState(0);
  const [pfp, setPfp] = useState("");
  const [userName, setUserName] = useState("Juli");
  const navigate = useNavigate();

  const changeJwt = (val) => setJwt(val);
  const contextValues = {
    jwt,
    changeJwt,
    points,
    setPoints,
    pfp,
    setPfp,
    userName,
    setUserName,
  };

  useEffect(()=>{
    var token = localStorage.getItem("storageJwt");
    if (token) {
      setJwt(JSON.parse(token));
    } else {
      navigate("/login");
    }
  }, [])

  return (
    <>
      <ContextUser.Provider value={contextValues}>
        <Outlet />
      </ContextUser.Provider>
    </>
  );
}

export default App;
