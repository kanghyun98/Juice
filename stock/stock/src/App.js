/*eslint-disable*/
import './App.css';
import React, {useState,lazy,Suspense,useHistory,useParams} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//components
//components
let Stock_page = lazy(()=>{return import('./components/stock_page.js')});
let Register = lazy(()=>{return import('./components/Register.js')});
let Service = lazy(()=>{return import('./components/Service.js')});
let Interest = lazy(()=>{return import('./components/Interest.js')});
let Login = lazy(()=>{return import('./components/Login.js')});
// let Chart = lazy(()=>{return import('./components/Chart.js')});

//bootstrap
//bootstrap
import {Navbar,Nav,NavDropdown,Button,Form,FormControl,Jumbotron,Container,Row,Col,Carousel,Card,Image,Collapse} from 'react-bootstrap';
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
import ad1 from './image/ad1.jpg';
import ad2 from './image/ad2.jpg';
import 워렌버핏 from './image/워렌버핏.png';
import JUICE from './image/JUICE.JPG';
//data
//data
import Saying from './data/saying.js';

//MainMainMain
//MainMainMain
//MainMainMain
function App() {
  let [search,search_set] = useState("");
  let [searchbutton,searchbutton_set] = useState(0);
  let [id, id_set] = useState("");
  return (
    <div className="App">
       {/* 검색 종목 로그인 등의 상단바 */}
       {/* 검색 종목 로그인 등의 상단바 */}
      <Navnav search={search} search_set={search_set} searchbutton={searchbutton} searchbutton_set = {searchbutton_set}></Navnav>

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
          <Suspense fallback = {<div>로딩중...</div>}>
            <Stock_page search={search} searchbutton ={searchbutton}></Stock_page>
          </Suspense>
        </Route>

        <Route path="/stock/:id">
          <Suspense fallback = {<div>로딩중...</div>}>
            <Stock_page search={search}  searchbutton ={searchbutton}></Stock_page>
          </Suspense>
        </Route>

        <Route path="/register">
          <Suspense fallback = {<div>로딩중...</div>}>
            <Register search={search}  searchbutton ={searchbutton}></Register>
          </Suspense>
        </Route>

        <Route path="/login">
          <Suspense fallback = {<div>로딩중...</div>}>
            <Login></Login>
          </Suspense>
        </Route>

        <Route path="/interest">
          <Suspense fallback = {<div>로딩중...</div>}>
            <Interest></Interest>
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
    <Navbar className = "Navbar1" expand="lg" style = {{color : "white"}}>
        <Navbar.Brand><Link to=""><img src = {JUICE} style={{width : "110px", height : " 40px"}}/></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link><Link to="/service">서비스 이탭을 없앨까 생각중</Link></Nav.Link>
            <Nav.Link><Link to="/stock">주식종목</Link></Nav.Link>
            <NavDropdown title="회원정보" id="basic-nav-dropdown">
              <NavDropdown.Item><Link to = "/interest">관심종목</Link></NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />.
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="예) 삼성전자" className="mr-sm-2" onChange={(e)=>{props.search_set(e.target.value)}}/>
            <Link to={"/stock/" + props.search}> <Button variant="outline-success" onClick = {()=>{props.searchbutton_set(props.searchbutton+1)}}>Search</Button></Link>
            
          </Form>
        </Navbar.Collapse>
      </Navbar>
      
     
            
      
      </div>
  );
}

//메인 페이지 컴포넌트
//메인 페이지 컴포넌트
//메인 페이지 컴포넌트
function Main_page(){
  return(
    <div>
      <Carousel className="sayingback" nextIcon="" nextLabel="" prevIcon="" indicators="">
            {
              Saying.map(function(a,i){
                return (
                  <Carousel.Item>
                    
                    <Carousel.Caption>
                    </Carousel.Caption>
                    <p style={{color:"white" ,"padding-top":"10px"}}> 
                    <Image src={워렌버핏} roundedCircle style={{width : "70px", height : "70px"} }/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {Saying[i].saying} <br/> - {Saying[i].name} - </p>

                  </Carousel.Item>
                )
              })
            }
          </Carousel> 
        <Jumbotron className="second_background">
            
            <br/><br/><br/><br/><br/>
            <h1 style={{"fontSize" : "150px"}}>J U I C E</h1>
            <h1 style={{"fontSize" : "50px"}}>주식뉴스</h1>
            <br/><br/><br/>
            <p style={{fontSize : "23px"}}>
              학업, 직장으로 인해 주식에 집중하실 수 없으신가요?
              <p>JUICE에서 주가와 기사량 변동에 관한 데이터를 알려드립니다.</p>
            </p>
            <p>
              <br></br>
              <Button style={{backgroundColor:"#000354"}} ><Link to = "/register">구독하기</Link></Button>
            </p>
          </Jumbotron>

        {/* 카드카드카드 */}
        {/* 카드카드카드 */}
        {/* 카드카드카드 */}
        {/* <Row justify-content-center>
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
        </Row> */}
      <p></p>
      <img src={ ad1 } />
      <img src={ ad2 } />
      <Jumbotron fluid className="second_background">
        <Container>
          <h1>우리의 서비스1</h1>
          <p>
            만약 당신이 삼성전자의 종목에 대한 뉴스를 보면... 시간낭비!
          </p>
        </Container>
      </Jumbotron>

      <Jumbotron fluid className="second_background">
        <Container>
          <h1>우리의 서비스2</h1>
          <p>
            실제 거래도 좋고, 모의투자 처럼 사용해도 좋아!
          </p>
        </Container>
      </Jumbotron >

      <Jumbotron fluid className="second_background">
        <Container>
          <h1>우리의 서비스3</h1>
          <p>
            다른 사이트들과는 달리 차별화된 시각적 UI/UX 제공!
          </p>
        </Container>
      </Jumbotron>
              
      <Example style={{margin:"200px"}}></Example>

      <Carousel className = "Main_Carousel" nextIcon="" nextLabel="" prevIcon="">
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
      <hr style={{"color":"white"}}/>
        <div style={{"color":"darkgrey", "fontWeight" : "1"}}>
        (주)주스컴퍼니 | 대표: 김이장 | 사업장: (12345) 서울특별시... 2층<br/>
          대표메일: JUICE@gmail.com | 사업자등록번호: 조만간<br/>
          통신판매업 신고번호: asdasd |<br/>
          Copyright@2018 Juice Co.,Ltd.<br/>
        </div>
      </div>
  );
}

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        style={{backgroundColor:"#000354"}} 
      >
        내가 받을 포트폴리오 보기
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text">
        <br/><br/><br/>
          여기에 이제 강현이의 포트폴리오 딱<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
      </Collapse>
    </>
  );
}
export default App; 