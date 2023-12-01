import React, {StrictMode} from "react";
import "./globals.css";
import {inputFile} from './config.js';

import ServiceAgreementPage from "./app";


export default function Home() {
  return (
  <StrictMode>
    <ServiceAgreementPage />
  </StrictMode>
  )
}
