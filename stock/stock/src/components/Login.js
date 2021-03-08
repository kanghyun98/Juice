import React, { useEffect, useState } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import "./Login.css";
import axios from 'axios';
import {Form, Button, Alert} from 'react-bootstrap';

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert,alertset] = useState(true);
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  useEffect(()=>{
    let temp = localStorage.getItem('email');
    console.log(temp);  
    props.idset(temp);
  },[])

  return (
        <div className="Login" style={{"width" : "700px", "align" : "center", "margin":"0 auto"}}>
        <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="email">
            <Form.Label>이메일</Form.Label>
            <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </Form.Group>
            <Button block size="lg" type="submit" disabled={!validateForm()} onClick={()=>{
              axios.post('./login',{email:{email},password:{password}})
              .then((res)=>{
                if(res.data === false){
                  alertset(false);
                }
                else{
                  alertset(true);
                  props.idset(email);
                  localStorage.setItem('email',email);
                 
                } 
              })
              .catch((err)=>{
                alertset(false);
              })
            }}>
            로그인
            </Button>
        </Form>
          {
            alert ===false
            ? 
            <Alert variant="danger">
            <Alert.Heading>로그인 에러</Alert.Heading>
            <p>
              이메일 혹은 비밀번호가 틀렸습니다. 다시 확인해주세요.
            </p>
          </Alert>
          :
          null
          }
        </div>
  );
}

