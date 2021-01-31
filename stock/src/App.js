/*eslint-disalbe*/
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav,Navbar,NavDropdown,Button,Form,FormControl,Jumbotron,Col,Row,Container,Card} from 'react-bootstrap';
import {Link, Switch, Route} from 'react-router-dom';
import React,{useState} from 'react';
function App() {
  return (
    <div className="App">
     <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Stock Alarm</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/stock">주식종목</Nav.Link>
            <Nav.Link href="/introduction">회사소개</Nav.Link>
            <NavDropdown title="회원정보" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">내정보</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">나의 주식</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path = "/">
          <Jumbotron>
            <h1>당신을 위한 주식 서비스,</h1>
            <p>
              직장, 학업으로 바빠 주식에 집중을 못하시는 당신을 위해,
              Stock Alarm에서 당신이 고른 종목 상태를 실시간으로 알려드립니다.
            </p>
            <p>
              <Button variant="primary">신청하기</Button>
            </p>
          </Jumbotron>

        <Container>
            <Row>
              <Col><Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="./main_news1.jpg" />
                <Card.Body>
                  <Card.Title>실시간 기사량 기반 데이터</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </Card.Text>
                  <Button variant="primary">알아보기</Button>
                </Card.Body>
              </Card></Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="./main_news2.jpg" />
                <Card.Body>
                  <Card.Title>장 마감 후 기사량 상승 종목 관찰</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </Card.Text>
                  <Button variant="primary">알아보기</Button>
                </Card.Body>
              </Card>
              <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="./main_news3.jpg" />
                <Card.Body>
                  <Card.Title>무료 알람 서비스</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </Card.Text>
                  <Button variant="primary">알아보기</Button>
                </Card.Body>
              </Card>
              </Col>
            </Row>
        </Container>
        </Route>
        <Route exact path ="/stock">
          <div>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="ml-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
            <h1>오늘의 종목</h1>
          </div>
          
        </Route>

        <Route exact path ="/introduction">
          asd
        </Route>
      </Switch>
    </div>
  );
}

export default App;
