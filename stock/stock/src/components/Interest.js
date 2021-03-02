import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { RESERVED_EVENTS } from 'socket.io/dist/socket';
function Interest(props){
    // let URL = "https://public.tableau.com/views/stockofKOSPI/test1?:language=en&:display_count=y&:origin=viz_share_link:showVizHome=no&:embed=true&코스피=";
   let [URL,URLset] = useState("https://public.tableau.com/views/stockofKOSPI/test1?:language=en&:display_count=y&:origin=viz_share_link:showVizHome=no&:embed=true&코스피=");
   
   useEffect(()=>{
        axios.post('/interest', encodeURIComponent(props.id))
        .then((res)=>{
            
            res.data.map(function(a,i){
                // URL.concat(res.data[i].stock,",")
                URLset(URL=>URL+res.data[i].stock+",");
                console.log(res.data[i].stock);
              })
        })
        .catch((err)=>{
            console.log("다시 체크해주세요!");
        })
    },[]);

  
    return (
        <div>
       <iframe src={URL} width="100%" height="950px"></iframe>
        </div>
    )
}

export default Interest;