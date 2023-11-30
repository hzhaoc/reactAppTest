'use client';

import React, {StrictMode} from "react";
import "./globals.css";

import Game from "./App2";
import App from "./App";
import data from "./testInput.json"


export default function Home() {
  return (
  <StrictMode>
    <App content={data}/>
  </StrictMode>
  )
}
