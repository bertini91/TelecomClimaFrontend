import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "../pages/Home";
import DetailWeather from "../pages/DetailWeather";

const Navegation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/city/:id" element={<DetailWeather />}></Route>
        {/* Enviar al componente el id */}
        <Route path="/*" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Navegation;
