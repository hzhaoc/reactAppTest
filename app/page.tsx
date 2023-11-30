'use client';

import React, {StrictMode} from "react";
import "./globals.css";

import ServiceAgreementPage from "./App";
import data from "./testInput.json"


export default function Home() {
  return (
  <StrictMode>
    <ServiceAgreementPage arrayNode={data}/>
  </StrictMode>
  )
}
