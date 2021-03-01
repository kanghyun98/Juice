import React,{useState,useEffect} from 'react';
import axios from 'axios';
function Purchase(){

    let [URL,URLset]=useState("");
    useEffect(()=>{
        axios.get('/purchase')
            .then((res)=>{
                URLset("https://public.tableau.com/views/stockofKOSPI/test1?:language=en&:display_count=y&:origin=viz_share_link:showVizHome=no&:embed=true&코스피="+res.data[0].stock1+","+res.data[0].stock2+","+res.data[0].stock3+","+res.data[0].stock4+","+res.data[0].stock5+","
                )
                })
            .catch((err)=>{
                console.log("다시 체크해주세요!");
            })
    },[]);
  
  
    return (
        <div>
       <iframe src={URL} width="1500" height="955"></iframe>
        </div>
    )
}

export default Purchase;