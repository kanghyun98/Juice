import React,{useState,useEffect} from 'react';
import axios from 'axios';
function Interest(){

    let [URL,URLset]=useState("");
    useEffect(()=>{
        axios.get('/interest')
            .then((res)=>{
                URLset("https://public.tableau.com/views/stockofKOSPI/test1?:language=en&:display_count=y&:origin=viz_share_link:showVizHome=no&:embed=true&코스피="
                
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

export default Interest;