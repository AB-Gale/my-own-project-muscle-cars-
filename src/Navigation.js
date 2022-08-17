import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Navbar from "./components/Navbar";
import AdminAddPage from "./pages/AdminAddPage";
import AdminProvider from "./contexts/AdminProvider";
import ClientProvider from "./contexts/ClientProvider";
import AdminPage from "./pages/AdminPage";
import AdminEditPage from "./pages/AdminEditPage";
import Basket from "./pages/Basket";

function Navigation() {
  return (
    <ClientProvider>
      <AdminProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/add" element={<AdminAddPage />} />
            <Route path="/admin/edit/:id" element={<AdminEditPage />} />
            <Route path="/basket" element={<Basket />} />
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </ClientProvider>
  );
}

export default Navigation;
