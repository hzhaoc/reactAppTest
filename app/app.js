'use client';

import { ClauseLevel } from './context.js';
import { useState, useEffect } from 'react';
import React from 'react';
import Renderer from "./render";
import {searchMentions} from './utils.js';


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
    getData()
  }, [])

  const mentions = searchMentions(data);
  //console.log(mentions);

  return (
    <div>
      <ClauseLevel.Provider value={0}>
        {data && data.length > 0 && <Renderer data={data} mens={mentions}/>}
      </ClauseLevel.Provider>
    </div>
  );
}





export default ServiceAgreementPage;
