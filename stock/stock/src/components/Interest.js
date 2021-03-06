import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { RESERVED_EVENTS } from 'socket.io/dist/socket';
import {Modal, Button,Table,Form,FormControl} from 'react-bootstrap';

function Interest(props){
   let [URL,URLset] = useState("https://public.tableau.com/views/stockofKOSPI/test1?:language=en&:display_count=y&:origin=viz_share_link:showVizHome=no&:embed=true&코스피=");
   let [cart,cartset] =useState("");

   useEffect(()=>{
        axios.post('/interest', encodeURIComponent(props.id))
        .then((res)=>{
          console.log("좋아 관심종목 데이터 받았어");
            res.data.map(function(a,i){
                URLset(URL=>URL+res.data[i].stock+",");
                cartset(cart=>cart+res.data[i].stock+",");
              })
        })
        .catch((err)=>{
            console.log("다시 체크해주세요!");
        })
    },[]);

    return (
        <div>
            <iframe src={URL} width="1500px" height="950px"></iframe>
            <br/>
            <Add_Button id = {props.id} cart = {cart}></Add_Button>
        </div>
    )
}

function Add_Button(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    var cart = props.cart.split(",");
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
            종목 추가
        </Button>
  
        <Modal show={show} onHide={handleClose} size = "xl" animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>{props.id} 님의 종목 관리</Modal.Title>
          </Modal.Header>
  
          <Modal.Body>
              <Table striped bordered hover variant="dark" style={{width : "300px", align : "center"}}>
                <thead>
                  <tr>
                    <th style = {{width : "500px", textAlign : "center"}}>관심종목</th>
                  </tr>
                </thead>
                <tbody>
                    {
                      cart.map(function(a,i){
                        return (
                          <div>
                            <tr>
                              <td style = {{width : "300px", textAlign : "center"}}>{cart[i]}</td>
                              <td style = {{width : "100px", textAlign : "center"}}> <Button variant="secondary" onClick={()=>{}}> 삭제 </Button></td>
                            </tr> 
                          </div>
                        )
                      })
                    }
                </tbody>

              </Table>
                <Form inline>
                  <FormControl type="text" placeholder="예) 삼성전자" className="mr-sm-2" onChange={()=>{}}/>
                  <Button variant="outline-success" onClick = {()=>{}}>Search</Button>
                </Form>

              
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


export default Interest;