import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Form,FormControl,Button,Modal,Table,Card,Accordion} from 'react-bootstrap';

function Portfolio(props){
        let URL = "https://public.tableau.com/views/juice_16149437075470/portfolio?:language=en&:display_count=y&:origin=viz_share_link:showVizHome=no&:embed=true&email="+props.id;    
        let [cart, cartset] = useState([]);
        let [modify, modify_set] =useState(false);
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
                <Accordion>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        포트폴리오 관리하기
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
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
                              cart.map(function(a,i){
                                return (
                                  <tr>
                                    <th style = {{width : "200px", textAlign : "center"}}>{cart[i]?.name}</th>
                                    <th style = {{width : "200px", textAlign : "center"}}>{cart[i]?.date}</th>
                                    <th style = {{width : "300px", textAlign : "center"}}>{cart[i]?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</th>
                                    <th style = {{width : "100px", textAlign : "center"}}>{cart[i]?.count} 주</th>
                                    <th style = {{width : "300px", textAlign : "center"}}>{cart[i]?.all_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</th>
                                    <th style = {{width : "300px", textAlign : "center"}}>{cart[i]?.memo}</th>

                                    <th> <Button style = {{width : "70px", textAlign : "center"}} variant="secondary" 
                                    onClick={()=>{
                                      modify_set(true);
                                      }}>
                                      수정</Button></th>
                                      <Modify modify={modify} modify_set={modify_set} key={i}
                                      name ={cart[i].name}
                                      date ={cart[i].date}
                                      price ={cart[i].price}
                                      count ={cart[i].count}
                                      memo ={cart[i].memo}
                                      idx ={cart[i].idx}
                                     />
                                    <th> <Button style = {{width : "70px", textAlign : "center"}} variant="secondary" >삭제</Button></th>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </Table>
                        <Button style = {{width : "90px", textAlign : "center", alignContent :"flex-end"}} variant="secondary">현금관리</Button> 
                        <Button style = {{width : "90px", textAlign : "center", alignContent :"right"}} variant="secondary">매수</Button> 
                        <Button style = {{width : "90px", textAlign : "center", alignContent :"right"}} variant="secondary">매도</Button>  
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card> 
                </Accordion>
                <br/><br/>
                <br/><br/>
                
            </div>
        )
}


function Modify(props) {
  
  return (
    <>
      <Modal show={props.modify} size = "xl"animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>종목 수정</Modal.Title>
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
                  <th style = {{width : "200px", textAlign : "center"}}>{props.name}</th>
                    <th style = {{width : "200px", textAlign : "center"}}>{props.date}</th>
                    <th style = {{width : "300px", textAlign : "center"}}>{props.price}</th>
                    <th style = {{width : "100px", textAlign : "center"}}>{props.count}</th>
                    <th style = {{width : "300px", textAlign : "center"}}>{props.idx}</th>
                    <th style = {{width : "300px", textAlign : "center"}}>메모</th>
                    <th style = {{width : "70px", textAlign : "center"}}>수정</th>
                    <th style = {{width : "70px", textAlign : "center"}}>삭제</th>
                </thead>
              </Table>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={()=>{
              props.modify_set(false)
            }}>
              닫기
            </Button>
            <Button variant="primary" onClick={()=>{
              props.modify_set(false)
            }}>
              저장하기
            </Button>
          </Modal.Footer>
        </Modal>  
    </>
  );
}

export default Portfolio;