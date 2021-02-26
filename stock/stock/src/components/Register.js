import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert} from 'react-bootstrap';
import '../App.css';
function Register (){
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [birth, setBirth] = useState("");
    const [repassword, setRepassword] = useState("");

    return (
      <div>
          <form className="register">
                <h3 style={{"padding-top":"20px"}}>회원가입</h3>

                <div className="form-group" style={{"width" : "700px", "align" : "center", "margin":"0 auto"}}>
                    <label>이름</label>
                    <input type="text" className="form-control" placeholder="홍길동"  onChange={(e) => setName(e.target.value)}/>
                </div>

                <div className="form-group" style={{"width" : "700px", "align" : "center", "margin":"0 auto"}}>
                    <label>이메일 주소</label>
                    <input type="email" className="form-control" placeholder="StockService@naver.com" onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="form-group" style={{"width" : "700px", "align" : "center", "margin":"0 auto"}} onChange={(e) => setPhone(e.target.value)}>
                    <label>전화번호</label>
                    <input type="number" className="form-control" placeholder="010-****-****" />
                </div>

                <div className="form-group" style={{"width" : "700px", "align" : "center", "margin":"0 auto"}} onChange={(e) => setPassword(e.target.value)}>
                    <label>비밀번호</label>
                    <input type="password" className="form-control" placeholder="password" />
                </div>

                <div className="form-group" style={{"width" : "700px", "align" : "center", "margin":"0 auto"}} onChange={(e) => setRepassword(e.target.value)}>
                    <label>비밀번호 확인</label>
                    <input type="password" className="form-control" placeholder="password" />
                </div>
                {
                    password ==repassword
                    ? <button type="submit" className="btn btn-primary btn-block">회원가입하기 </button>
                    :
                    <Alert variant="danger">
                    <Alert.Heading>비밀번호 확인 오류</Alert.Heading>
                    <p>
                      비밀번호가 달라요, 다시 한 번 확인 해주세요~
                    </p>
                  </Alert>
                }
                
                <p className="forgot-password text-right">
                    이미 회원가입을 하셨나요? <a href="/login">로그인하기</a>
                </p>


            </form>
      </div>  
    );
}

export default Register;