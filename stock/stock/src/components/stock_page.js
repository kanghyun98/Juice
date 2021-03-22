/*eslint-disable*/
import React,{useState,useEffect,PureComponent} from 'react';
import {useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ComposedChart,Area,Bar,ResponsiveContainer
  } from 'recharts';
import {Form,FormControl,Button} from 'react-bootstrap';

import Chart from './Chart.js';
import Chart2 from './Chart2.js';
import Chartyear from './Chartyear.js';
import Chartmonth from './Chartmonth.js';

function Stock_page(props){
  let [chartdata,chartdataset]=useState([]);
  let [chartdata2,chartdata2set]=useState([]);
  let [draw,drawset] = useState(false);
  let [title,titleset] = useState(false);
  useEffect(()=>{
    let temp = localStorage.getItem('email');
    props.idset(temp);
  },[]);
  
   useEffect(()=>{
    axios.post('/stock_month', encodeURIComponent(props.search))
    .then((res)=>{
        chartdataset([...res.data])
        drawset(true);
        titleset(true); 
    })
    .catch((err)=>{
        console.log("회사 정보가 없어요. 다시 체크해주세요!");
        drawset(false); 
        titleset(false);
    })
  },[props.searchbutton])
    
  useEffect(()=>{
    axios.post('/stock_year', encodeURIComponent(props.search))
    .then((res)=>{
        chartdata2set([...res.data]);
        titleset(true);
        drawset(true);
    })
    .catch((err)=>{
        console.log("회사 정보가 없어요. 다시 체크해주세요!");
        drawset(false); 
        titleset(false);
    })
  },[props.searchbutton])

  let left,right;
    return (  
        <div>
          <br/><br/><br/>
          {/* <Chart2></Chart2> */}
            {/* <Chartmonth search={props.search} searchbutton = {props.searchbutton}></Chartmonth> */}
            {
              title === true
              ?<div>
                
                <h1> {props.search}</h1>
                <br/>
                <h3>1개월 뉴스 기사량 분석 그래프</h3>
                </div>
              
              :null
            }
           {
            draw ===true
            ?
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
              width={1500}
              height={400}
              data={chartdata}
              margin={{
                top: 50, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="20 20" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />  
              <YAxis yAxisId="right" orientation="right" /> 
              <Tooltip /> 
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="changepct" stroke="#FF0000" dot ={false}  activeDot={{ r: 8 }} animationDuration={2000}/>
              <Line yAxisId="right" type="monotone" dataKey="news" stroke="#00D8FF" dot ={false}  activeDot={{ r: 8 }} animationDuration={2000}/>
          </LineChart>
        </ResponsiveContainer>
        :<div>
          <br/><br/><br/><br/><br/>
          <h1>종목 검색 부탁드립니다 </h1> <br/>
          <h1>(띄어쓰기도 확인해주세요)</h1>
        </div>
        }
          {/* 1년치 등락률 기사량 */}
          {/* 1년치 등락률 기사량 */}
          <br/><br/><br/><br/>
                
              
          {
              title === true
              ?<h3>3개월 뉴스 기사량 분석 그래프</h3>
              :null
            }
          {
            draw ===true
            ?
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
              width={1500}
              height={400}
              data={chartdata2}
              margin={{
                top: 50, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="20 20" />
              <XAxis dataKey="date" domain={[left,right]}/>
              <YAxis yAxisId="left" />  
              <YAxis yAxisId="right" orientation="right" /> 
              <Tooltip /> 
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="changepct" stroke="#FF0000" dot ={false}  activeDot={{ r: 8 }} animationDuration={1000}/>
              <Line yAxisId="right" type="monotone" dataKey="news" stroke="#00D8FF" dot ={false}  activeDot={{ r: 8 }} animationDuration={1000}/>
          </LineChart>
        </ResponsiveContainer>
            :null
          }
            {/* <Chartyear search={props.search} searchbutton = {props.searchbutton}></Chartyear> */}
          {/* {draw===true?<Chart chartdata={chartdata2} searchbutton = {props.searchbutton} search={props.search}></Chart>: null} */}
          <br/><br/><br/><br/>
          {draw===true?<Button onClick = {()=>{}} variant="warning" style = {{color : "white"}}>관심종목에 넣기</Button>: null}
          <br/><br/><br/><br/>
          <br/><br/><br/><br/>
        </div>
    );  
}

export default Stock_page;  