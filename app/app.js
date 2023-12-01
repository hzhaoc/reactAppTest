'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import Renderer from "./render";
import {preProcessInput} from './utils.js';


const ServiceAgreementPage = () => {
  const [data, setData] = useState([]);

  const getData=()=>{
    fetch('./testInput.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        setData(myJson)
      });
  }

  useEffect( ()=>{
    getData();
  }, [])

  const mentions = {}
  const clauses = {}
  preProcessInput(data, mentions, clauses);
  //console.log("clauses", clauses);
  //console.log("mentions", mentions);

  return (  
    <div>
        {data && data.length > 0 && <Renderer data={data} mens={mentions} clses={clauses}/>}
    </div>
  );
}





export default ServiceAgreementPage;
