

import React from "react";
import "./App.css";
import Products from "./components/Products";

function App() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">TrendyThreads</h1>
      <Products />
    </div>
  );
}

export default App;
