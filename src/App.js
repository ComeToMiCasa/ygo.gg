import React from "react";
import Home from "../pages/home";
import DeckRegister from "../pages/deckRegister";
import MatchRegister from "../pages/matchRegister";
import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import Admin from "../pages/admin";

const App = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/match" element={<MatchRegister />} />
                <Route path="/deck" element={<DeckRegister />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </div>
    );
};

export default App;
