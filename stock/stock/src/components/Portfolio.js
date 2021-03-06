import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Form,FormControl,Button,Modal,Table} from 'react-bootstrap';

function Portfolio(props){
        let URL = "https://public.tableau.com/views/portfolio_money/1?:language=en&:display_count=y&:origin=viz_share_link:showVizHome=no&:embed=true&id="+"1";    
        let [cart, cartset] = useState([]);
       
        useEffect(()=>{
          axios.post('/portfolio', encodeURIComponent(props.id))
          .then((res)=>{
                console.log("좋아 포트폴리오 데이터 받았어");
                cartset([...cart, ...res.data]);
                console.log(cart);
          })
          .catch((err)=>{
              console.log("다시 체크해주세요!");
          })
      },[]);

        return (
            <div>
                <iframe src={URL} width="100%" height="950px"></iframe>         
                <br/><br/>
                <br/><br/>
                <Example1 id={props.id} cart = {cart}></Example1>
                <br/><br/>
            </div>
        )
}

function Example1(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          포트폴리오 관리하기
        </Button>
  
        <Modal show={show} size = "xl" onHide={handleClose} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>{props.id} 님의 종목 관리</Modal.Title>
          </Modal.Header>
                     
          <Modal.Body>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th style = {{width : "200px", textAlign : "center"}}>종목명</th>
                    <th style = {{width : "200px", textAlign : "center"}}>날짜</th>
                    <th style = {{width : "300px", textAlign : "center"}}>금액</th>
                    <th style = {{width : "100px", textAlign : "center"}}>수량</th>
                    <th style = {{width : "300px", textAlign : "center"}}>매수 / 매도</th>
                    <th style = {{width : "300px", textAlign : "center"}}>메모</th>
                    <th style = {{width : "70px", textAlign : "center"}}>수정</th>
                    <th style = {{width : "70px", textAlign : "center"}}>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    props.cart.map(function(a,i){
                      return (
                        <tr>
                          <th style = {{width : "200px", textAlign : "center"}}>{props.cart[i]?.name}</th>
                          <th style = {{width : "200px", textAlign : "center"}}>{props.cart[i]?.date}</th>
                          <th style = {{width : "300px", textAlign : "center"}}>{props.cart[i]?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</th>
                          <th style = {{width : "100px", textAlign : "center"}}>{props.cart[i]?.count} 주</th>
                          <th style = {{width : "300px", textAlign : "center"}}>{props.cart[i]?.all_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</th>
                          <th style = {{width : "300px", textAlign : "center"}}>{props.cart[i]?.memo}</th>
                          <th> <Button style = {{width : "70px", textAlign : "center"}} variant="secondary">수정</Button></th>
                          <th> <Button style = {{width : "70px", textAlign : "center"}} variant="secondary">삭제</Button></th>
                        </tr>
                      )
                    })
                  }
                   
                </tbody>
              </Table>
          </Modal.Body>
  
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              닫기
            </Button>
            <Button variant="primary" onClick={handleClose}>
              저장하기
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default Portfolio;