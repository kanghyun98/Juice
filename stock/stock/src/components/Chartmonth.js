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
        axios.post('/stock_month', encodeURIComponent(props.search))
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
                    // yAxesID : "y-axis-0",
                    label: '등락률',
                    data: pct,
                    borderColor : "#FF0000",
                    fill:false,
                },
                {
                    // yAxesID : "y-axis-1",
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
                            // id:"pct",
                            // position : "left",
                            ticks : {
                                autoSkip :true,
                                maxTicksLimit :10,
                                beginAtZero : true,
                            },
                            gridLines : {
                                display : false,
                            },
                            type :"monotone",
                        },{
                            // id:"news",
                            // position : "right",
                            ticks : {
                                autoSkip :true,
                                maxTicksLimit :10,
                                beginAtZero : true,
                            },
                            gridLines : {
                                display : false,
                            },
                            type :"monotone",
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
                    zoom :{
                        enabled:true,
                        drag:false,
                        mode:"x",
                        speed : 100,
                    }
                }}
                />
            </div>
        )
    }

export default ChartViewer;