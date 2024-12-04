import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import Login from "./components/pages/Login.jsx";
import Register from "./components/pages/Register.jsx";
import "./index.css";
import Profile from "./components/pages/Profile.jsx";
import PointShop from "./components/pages/PointShop.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Offer from "./components/pages/Offer.jsx";
import CreatePointOffer from "./components/pages/CreatePointOffer.jsx";
import PointOffer from "./components/pages/PointOffer.jsx";
import CreateOffer from "./components/pages/CreateOffer.jsx";
import EditOffer from "./components/pages/EditOffer.jsx";
import EditPointOffer from "./components/pages/EditPointOffer.jsx"
import App from "./App.jsx";
import ProfileCharity from "./components/pages/ProfileCharity.jsx";
import ProfileEnterprise from "./components/pages/ProfileEnterprise.jsx";
import UpgradeAccount from "./components/pages/UpgradeAccount.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pointShop" element={<PointShop />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upgrade" element={<UpgradeAccount />} />
          <Route path="/profileCha" element={<ProfileCharity />} />
          <Route path="/profileEnt" element={<ProfileEnterprise />} />
          <Route path="/register" element={<Register />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/shopOffer/:id" element={<PointOffer />} />
          <Route path="/shopOffer/register" element={<CreatePointOffer />} />
          <Route path="/shopOffer/edit/:id" element={<EditPointOffer/>} />
          <Route path="/offer/register" element={<CreateOffer />} />
          <Route path="/offer/edit/:id" element={<EditOffer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
