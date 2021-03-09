/*eslint-disable*/
import './App.css';
import React, {useState,lazy,Suspense,useHistory,useParams,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//components
//components
let Stock_page = lazy(()=>{return import('./components/stock_page.js')});
let Register = lazy(()=>{return import('./components/Register.js')});
let Service = lazy(()=>{return import('./components/Service.js')});
let Interest = lazy(()=>{return import('./components/Interest.js')});
let Login = lazy(()=>{return import('./components/Login.js')});
let Portfolio = lazy(()=>{return import('./components/Portfolio.js')});
// let Chart = lazy(()=>{return import('./components/Chart.js')});

//bootstrap
//bootstrap
import {Navbar,Nav,NavDropdown,Button,Form,FormControl,Jumbotron,Container,Row,Col,Carousel,Card,Image} from 'react-bootstrap';
//router
//router
import {Link,Switch,Route} from 'react-router-dom';
//chart
//chart
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ComposedChart,Area,Bar
} from 'recharts';
//image
//image
import News_Up from './image//News_Up.png';
import Real_time from './image//Realtime.png';
import Alarm from './image/Alarm.png';
//data
//data
import Saying from './data/saying.js';

//MainMainMain
//MainMainMain
//MainMainMain
function App() {
  let [search,search_set] = useState("");
  let [searchbutton,searchbutton_set] = useState(0);
  let [id, idset] = useState("");

  useEffect(()=>{
    let temp = localStorage.getItem('email');
    console.log(temp); 
    idset(temp);
  },[])

  return (
    <div className="App">
      {
        
      }
      <Navnav id = {id} idset = {idset} search={search} search_set={search_set} searchbutton={searchbutton} searchbutton_set = {searchbutton_set}></Navnav>
      <Switch>
        <Route exact path = "/">

          <Main_page></Main_page>
        </Route>

        <Route exact path="/service">
          <Suspense fallback = {<div>로딩중...</div>}>
            <Service></Service>
          </Suspense>
        </Route>
        
        <Route path="/stock">
          <Suspense fallback = {<div> 로딩중...</div>}>
            <Stock_page search={search} searchbutton ={searchbutton} idset = {idset}></Stock_page>
          </Suspense>
        </Route>

        <Route path="/stock/:id">
          <Suspense fallback = {<div>로딩중...</div>}>
            <Stock_page search={search} idset = {idset} searchbutton ={searchbutton}></Stock_page>
          </Suspense>
        </Route>

        <Route path="/register">
          <Suspense fallback = {<div>로딩중...</div>}>
            <Register search={search} idset = {idset} searchbutton ={searchbutton}></Register>
          </Suspense>
        </Route>

        <Route path="/login">
          <Suspense fallback = {<div>로딩중...</div>}>
            <Login idset={idset} id ={id} idset = {idset}></Login>
          </Suspense>
        </Route>

        <Route path="/interest">
          <Suspense fallback = {<div>로딩중...</div>}>
            <Interest id={id} idset = {idset}></Interest>
          </Suspense>
        </Route>

        <Route path="/portfolio">
          <Suspense fallback = {<div>로딩중...</div>}>
            <Portfolio id={id} idset = {idset}></Portfolio>
          </Suspense>
        </Route>
      </Switch>
    </div>
  );
}

//Navbar 상단바 컴포넌트
//Navbar 상단바 컴포넌트 
//Navbar 상단바 컴포넌트
function Navnav(props){

  return(
    <div>
      {
        props.id===""||props.id===null
        ?
        <Navbar className = "Navbar1" expand="lg">
          <Navbar.Brand><Link to="">Stock Alarm</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link><Link to="/service">서비스</Link></Nav.Link>
              <Nav.Link><Link to="/stock">주식종목</Link></Nav.Link>
              <Nav.Link><Link to="/login">로그인</Link></Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="예) 삼성전자" className="mr-sm-2" onChange={(e)=>{props.search_set(e.target.value)}}/>
              <Link to={"/stock/" + props.search}> <Button variant="outline-success" onClick = {()=>{props.searchbutton_set(props.searchbutton+1)}}>Search</Button></Link>
              
            </Form>
          </Navbar.Collapse>
        </Navbar>
        :
        <Navbar className = "Navbar1" expand="lg">
          <Navbar.Brand><Link to="">Stock Alarm</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link><Link to="/service">서비스</Link></Nav.Link>
              <Nav.Link><Link to="/stock">주식종목</Link></Nav.Link>
              <NavDropdown title="회원정보" id="basic-nav-dropdown">
                <NavDropdown.Item><Link to = "/interest">관심종목</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to = "/portfolio">포트폴리오</Link></NavDropdown.Item>
                <NavDropdown.Item onClick={()=>{
                  props.idset("");
                  localStorage.removeItem('email');
              }}>로그아웃</NavDropdown.Item>
                
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="예) 삼성전자" className="mr-sm-2" onChange={(e)=>{props.search_set(e.target.value)}}/>
              <Link to={"/stock/" + props.search}> <Button variant="outline-success" onClick = {()=>{props.searchbutton_set(props.searchbutton+1)}}>Search</Button></Link>
              
            </Form>
          </Navbar.Collapse>
        </Navbar>
      }
    
      
      <Carousel className="sayingback" prevIcon="" nextIcon="" indicators="">
          {
            Saying.map(function(a,i){
              return (
                <Carousel.Item>
                 {/* <Image src={Saying[i].image} roundedCircle/> */}
                  
                  <Carousel.Caption>
                  </Carousel.Caption>
                  <p style={{color:"white" ,"padding-top":"10px"}}>  {Saying[i].saying} <br/> - {Saying[i].name} - </p> 
                </Carousel.Item>
              )
            })
          }
      </Carousel>
            
      
      </div>
  );
}

//메인 페이지 컴포넌트
//메인 페이지 컴포넌트
//메인 페이지 컴포넌트
function Main_page(){
  let [URL,URLset] = useState("https://public.tableau.com/views/juice_16149437075470/wordcloud?:language=en&:display_count=y&:origin=viz_share_link:showVizHome=no&:embed=true&종목명=");
  return(
    <div>
        <Jumbotron className="main_background">
            <h1>주식서비스</h1>
            <br></br><br></br>
            <p>
              학업, 직장으로 인해 주식에 집중하실 수 없으신가요?
              <p>Stock Alarm에서 주가와 기사량 변동에 관한 데이터를 알려드립니다.</p>
              부담없이 신청하세요.
            </p>
            <p>
              <br></br><br></br>
              <Button variant="primary" ><Link to = "/register">구독하기</Link></Button>
            </p>
          </Jumbotron>



          <Jumbotron style={{backgroundColor : "black", color : "white"}}>
            <h1>워드클라우드</h1>
            <iframe src={URL} width="90%" height="950px"></iframe>
          </Jumbotron>
      <Container>
        <h3 className="title1">대표 종목 예시 </h3>
        <Row justify-content-center>
          <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" className="card3" src={News_Up} />
            <Card.Body>
              <Card.Title>삼성전자</Card.Title>
              <Card.Text>

              </Card.Text>
              <Button variant="primary">종목 보러가기</Button>
            </Card.Body>
          </Card>
          </Col>
          <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" className = "card3" src={News_Up} />
            <Card.Body>
              <Card.Title>아모레퍼시픽</Card.Title>
              <Card.Text>
                
              </Card.Text>
              <Button variant="primary">종목 보러가기</Button>
            </Card.Body>
          </Card>
          </Col>
          <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" className="card3" src={News_Up} />
            <Card.Body>
              <Card.Title>박셀바이오</Card.Title>
              <Card.Text>
                
              </Card.Text>
              <Button variant="primary">종목 보러가기</Button>
            </Card.Body>
          </Card>
          </Col>
        </Row>
      </Container>  
      <p></p>
      <Carousel className = "Main_Carousel">
        <Carousel.Item >
          <img
            className="back"
            src={Real_time}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>실시간 기사량 기반 데이터 분석</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="back"
            src={News_Up}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>장 마감 이후 기사량 상승 종목 관찰</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="back"
            src={Alarm}
            alt="Third slide" 
            
          />
          
          <Carousel.Caption>
            <h3>선택 종목 기사량,주가 급변 시 알람서비스 제공</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <hr/>

      </div>
  );
}


export default App; 