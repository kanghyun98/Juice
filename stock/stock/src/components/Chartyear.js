import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import * as Zoom from 'chartjs-plugin-zoom';

const ChartViewer=(props)=>{
   
    const [chartdata, setchartdata] = useState({});
    const news =[];
    const date=[];
    const pct = [];
    useEffect(()=>{
        axios.post('/stock_year', encodeURIComponent(props.search))
        .then((res)=>{
            for(let dataObj of res.data){
                pct.push((dataObj.changepct))
                news.push(parseInt(dataObj.news))
                date.push(parseInt(dataObj.date))   
            }
        })
        .catch((err)=>{
            console.log("회사 정보가 없어요. 다시 체크해주세요!");
        })
      },[props.searchbutton])
    const chart = ()=>{
        setchartdata({
            labels : date,
            datasets :[
                {
                    yAxisID : "y-axis-1",
                    label: '등락률',
                    data: pct,
                    borderColor : "#FF0000",
                    fill:false,
                },
                {
                    yAxisID : "y-axis-2",
                    label: '기사량',
                    data: news,
                    borderColor : "#00D8FF",
                    fill:false,
                },
               
            ],
        });
    };

        useEffect(()=>{
            chart();
        },[]);


        return (
                  
            <div style={{width : "80%",height:"1000px", marginLeft : "auto", marginRight:"auto"}}>
                  <h1>{props.search}</h1>
                <Line 
                data={chartdata}
                options={{
                    responsive : true,
                    elements: {
                        point:{
                            radius: 1.5
                        }
                    },
                    title:{
                        // text : "hhhihihihi", 
                        display :true,
                    },
                    scales : {
                        yAXes : 
                        [{
                            
                            ticks : {
                                autoSkip :true,
                                maxTicksLimit :500,
                                beginAtZero : true,
                            },
                            gridLines : {
                                display : false,
                            },
                            type :"monotone",
                            id:"y-axis-1",
                            position : "left",
                        },{
                            
                            ticks : {
                                autoSkip :true,
                                maxTicksLimit :10,
                                beginAtZero : true,
                            },
                            gridLines : {
                                display : false,
                            },
                            type :"monotone",
                            id:"y-axis-2",
                            position : "right",
                        },
                        ],

                        xAxes :
                        [{
                            gridLines :{
                                display :false,
                            },
                        }]
                    },
                    pan : {
                        enabled :true,
                        mode : "x",
                        speed : 100,
                    },
                    zoom: {
                        enabled: true,
                        mode: 'x',
                        speed: 1,
                        threshold: 0,
                        sensitivity: 0
                        }
                }}
                />
            </div>
        )
    }

export default ChartViewer;