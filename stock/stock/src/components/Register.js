import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
function Register (){
        // let [chartdata,chartdataset]=useState([]);
        // let [chartdata,chartdataset]=useState([]);
        // let [chartdata,chartdataset]=useState([]);
        // let [chartdata,chartdataset]=useState([]);
    return (
      <div>
          <form className="register">
                <h3 style={{"padding-top":"20px"}}>회원가입</h3>

                <div className="form-group" style={{"width" : "700px", "align" : "center", "margin":"0 auto"}}>
                    <label>이름</label>
                    <input type="text" className="form-control" placeholder="홍길동" />
                </div>

                <div className="form-group" style={{"width" : "700px", "align" : "center", "margin":"0 auto"}}>
                    <label>이메일 주소</label>
                    <input type="email" className="form-control" placeholder="StockService@naver.com" />
                </div>

                <div className="form-group" style={{"width" : "700px", "align" : "center", "margin":"0 auto"}}>
                    <label>전화번호</label>
                    <input type="number" className="form-control" placeholder="010-****-****" />
                </div>

                <div className="form-group" style={{"width" : "700px", "align" : "center", "margin":"0 auto"}}>
                    <label>비밀번호</label>
                    <input type="password" className="form-control" placeholder="password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">회원가입하기 </button>
                <p className="forgot-password text-right">
                    이미 회원가입을 하셨나요? <a href="/login">로그인하기</a>
                </p>
            </form>
      </div>  
    );
}

export default Register;