/*eslint-disable*/
import React,{useState,useEffect} from 'react';
import {useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ComposedChart,Area,Bar
  } from 'recharts';
import {Form,FormControl,Button} from 'react-bootstrap';
import { Zoom } from '@material-ui/core';
//
function Stock_page(props){
  let [chartdata,chartdataset]=useState([]);
  let [draw,drawset] = useState(false);
 
   useEffect(()=>{
    axios.post('/stock', encodeURIComponent(props.search))
    .then((res)=>{
        chartdataset([...res.data])
        drawset(true);
    })
    .catch((err)=>{
        console.log("회사 정보가 없어요. 다시 체크해주세요!");
        drawset(false); 
    })
  },[props.searchbutton])
    
    return (  
        <div>
         {
            draw ===true
            ?
            <LineChart
            width={1500}
            height={700}
            data={chartdata}
            margin={{
              top: 50, right: 30, left: 20, bottom: 5,
            }
           
          }
          >
            <CartesianGrid strokeDasharray="20 20" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />  
            <YAxis yAxisId="right" orientation="right" /> 
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="linear" dataKey="changepct" stroke="#FF0000" activeDot={{ r: 8 }} />
            <Line yAxisId="right" type="monotone" dataKey="news" stroke="#00D8FF" />
        </LineChart>
        
        :<h3>종목을 잘못 입력하셨습니다. 철자 확인해주세요~ </h3>
          }
         {draw===true?<Button onClick = {()=>{}} variant="warning" style = {{color : "white"}}>관심종목에 넣기</Button>: null}
         
         {draw===true?<Button onClick = {()=>{}} variant="warning" style = {{color : "white"}}>포트폴리오에 넣기</Button>: null}
         
        </div>
    );  
}

export default Stock_page;  