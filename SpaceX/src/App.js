import "./styles.css";
import CardComponent from "./CardComponent";
import { useState, useEffect } from "react";
import axios from "axios";
export default function App() {
  return (
    <div className="App">
      <h3>SpaceX Launch Program</h3>
      <CardComponent />
    </div>
  );
}
