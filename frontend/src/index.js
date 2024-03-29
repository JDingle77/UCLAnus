import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Homepage from "./Homepage/Homepage";
import Accountpage from "./Accountpage/Accountpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReviewPage from "./ReviewPage/ReviewPage.js"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/review_page" element={<ReviewPage />} />
        <Route path="/account" element={<Accountpage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
