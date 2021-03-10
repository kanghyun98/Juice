
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Form,FormControl,Button,Modal,Table,Card,Accordion} from 'react-bootstrap';
import moment from 'moment';
function Portfolio(props){
  let [URL,URLset] = useState("https://public.tableau.com/views/juice_16149437075470/portfolio?:language=en&:display_count=y&:origin=viz_share_link:showVizHome=no&:embed=true&Email="+props.id);
  let [cart, cartset] = useState([]);
      const [modalState, setModalState] = useState({
        showModal: false,
        stockInfo: {},
     });
     
      const [sell, setsell] = useState({
      showModal: false,
      stockInfo: {},
      });

      const [buy, setbuy] = useState({
        showModal: false,
        stockInfo: {},
      });

      const [cash, setcash] = useState({
        showModal: false,
        stockInfo: {},
      });

        useEffect(()=>{
          let temp = localStorage.getItem('email');
          console.log(temp); 
          props.idset(temp);
        },[]);
        
        useEffect(()=>{
          axios.post('/portfolio', encodeURIComponent(props.id))
          .then((res)=>{
                console.log("좋아 포트폴리오 데이터 받았어");
                cartset([...res.data]);
          })
          .catch((err)=>{
              console.log("다시 체크해주세요!");
          })
      },[]);

        return (
            <div>
              {URL}
              <iframe src={URL} width="1500px" height="950px"></iframe>
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
                                    <td style = {{width : "200px", textAlign : "center"}}>{cart[i]?.name}</td>
                                    <td style = {{width : "200px", textAlign : "center"}}>{cart[i]?.date}</td>
                                    <td style = {{width : "300px", textAlign : "center"}}>{cart[i]?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</td>
                                    <td style = {{width : "100px", textAlign : "center"}}>{cart[i]?.count} 주</td>
                                    <td style = {{width : "300px", textAlign : "center"}}>{cart[i]?.all_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</td>
                                    <td style = {{width : "300px", textAlign : "center"}}>{cart[i]?.memo}</td>

                                    <td> <Button style = {{width : "70px", textAlign : "center"}} variant="secondary" 
                                    onClick={() => {
                                        setModalState({
                                            stockInfo: cart[i],
                                            showModal: true,
                                        })
                                    }}>
                                      수정</Button></td>
                                      
                                    
                                    <td> <Button style = {{width : "70px", textAlign : "center"}} variant="secondary" >삭제</Button></td>
                                  </tr>
                                )
                              })
                            }
                            
                          </tbody>
                        </Table>
                         {
                           cart.map(function(a,i){
                             return (
                               <div>
                                   <Modify modalState={modalState} setModalState={setModalState}></Modify>
                               </div>
                             )
                           })
                         }
                        <Button style = {{width : "90px", textAlign : "center", alignContent :"flex-end"}} variant="secondary">현금관리</Button> 
                        <Button style = {{width : "90px", textAlign : "center", alignContent :"right"}} variant="secondary">매수</Button> 
                        <Button style = {{width : "90px", textAlign : "center", alignContent :"right"}} variant="secondary" 
                        onClick={()=>{
                          setsell({
                            stockInfo: "",
                            showModal: true,
                        })
                        }}
                        >매도</Button>  
                        <Sell sell={sell} setsell={setsell} id={props.id}></Sell>
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
      <Modal show={props.modalState.showModal} size = "xl" animation={true}>
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
                  </tr>
               
                </thead>
                <tbody>
                    <td style = {{width : "200px", textAlign : "center"}}>{props.modalState.stockInfo.name} </td>
                    <td style = {{width : "200px", textAlign : "center"}}>{props.modalState.stockInfo.date} </td>
                    <td style = {{width : "200px", textAlign : "center"}}>{props.modalState.stockInfo.price} </td>
                    <td style = {{width : "200px", textAlign : "center"}}>{props.modalState.stockInfo.count} </td>
                    <td style = {{width : "200px", textAlign : "center"}}>{props.modalState.stockInfo.all_price} </td>
                    <td style = {{width : "200px", textAlign : "center"}}>{props.modalState.stockInfo.memo} </td>
                </tbody>
              </Table>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={()=>{
              props.setModalState({
                stockInfo: "",
                showModal : false
            })
            }}>
              닫기
            </Button>
            <Button variant="primary" onClick ={()=>{
              props.setModalState({
              stockInfo: "",
               showModal : false,
              })
            }}>
              저장하기
            </Button>
          </Modal.Footer>
        </Modal>  
    </>
  );
}


function Sell(props){
    const [name, setname] = useState("");
    const [date, setdate] = useState("");
    const [price, setprice] = useState(0);
    const [count, setcount] = useState(0);
    const [memo, setmemo] = useState("");
    const email = props.id;
    return (
      <>
        <Modal show={props.sell.showModal} size = "xl" animation={true}>
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
                        <th style = {{width : "300px", textAlign : "center"}}>수량</th>
                        <th style = {{width : "300px", textAlign : "center"}}>매수 / 매도</th>
                        <th style = {{width : "300px", textAlign : "center"}}>메모</th>
                      </tr>
                  
                    </thead>
                    <tbody style ={{ textAlign : "center", align : "center",  margin :"0 auto"}}>
                  <td>
                    <input type="text" className="form-control" placeholder="삼성전자" onChange={(e) => setname(e.target.value)}/>
                  </td>

                  <td>
                    <input type="date" className="form-control" onChange={(e) => setdate(e.target.value.toString())}/>
                  </td>

                  <td>
                    <input type="price" className="form-control" placeholder="0 원"  onChange={(e) => setprice(e.target.value)}/>
                  </td>

                  <td>
                    <input type="number" className="form-control" placeholder="0 주"  onChange={(e) => setcount(e.target.value)}/>
                  </td>

                  <td>
                    매도
                  </td>

                  <td>
                    <input type="text" className="form-control" placeholder="메모"  onChange={(e) => setmemo(e.target.value)}/>
                  </td>
                    </tbody>
                  </Table>
              </Modal.Body>
              
              <Modal.Footer>
                <Button variant="secondary" onClick={()=>{
                  props.setsell({
                    stockInfo: "",
                    showModal : false
                })
                }}>
                  닫기
                </Button>
                
                <Button variant="primary" onClick ={()=>{
                  props.setsell({
                  stockInfo: "",
                  showModal : false,
                  })
                  axios.post('/portfolio_sell',{name : {name}, date : {date}, price : {price}, count : {count}, memo : {memo}, email:{email}})
                  .then(()=>{
                    
                  })
                  .catch(()=>{

                  })
                }}>
                  저장하기
                </Button>
              </Modal.Footer>
            </Modal>   
      </>
    )
  }

export default Portfolio;
