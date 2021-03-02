import React,{useState,useEffect} from 'react';
import axios from 'axios';

function Portfolio(props){
        let URL = "https://public.tableau.com/views/portfolio_money/1?:language=en&:display_count=y&:origin=viz_share_link:showVizHome=no&:embed=true&id="+"1";    
        return (
            <div>
                <iframe src={URL} width="100%" height="950px"></iframe>
                
            </div>
        )
}
export default Portfolio;