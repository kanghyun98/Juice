/*eslint-disable*/
import React,{useState,useEffect} from 'react';
import {useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ComposedChart,Area,Bar
  } from 'recharts';
import {Form,FormControl,Button} from 'react-bootstrap';
//
function Stock_page(){
  let [chartdata,chartdataset ]=useState([]);
   useEffect(()=>{
    axios.get('/stock/kakao')
    .then((res)=>{
        chartdataset([...chartdata, ...res.data])
    })
     },[])
    return (  
        <div>
         <LineChart
            width={1500}
            height={700}
            data={chartdata}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="날짜" />
            <YAxis yAxisId="left" />  
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="등락률" stroke="#FF0000" activeDot={{ r: 8 }} />
            <Line yAxisId="right" type="monotone" dataKey="기사량" stroke="#00D8FF" />
        </LineChart>



        
        </div>
    );  
}

export default Stock_page;  