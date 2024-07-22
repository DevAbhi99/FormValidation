import React,{useState} from "react";
import './Signup.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Signup(){

const [username, setUsername]=useState('');
const [password, setPassword]=useState('');
const navigate=useNavigate();

const handleSubmit=()=>{
    

const userData={username, password};

    const userPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!userPattern.test(username)){
        alert('Invalid Format!');
    }
    else if(username===''){
      alert('Username is empty');
    }
    else if(password===''){
        alert('Password is empty');
    }
    else if(password.length<6|password.length>30){
        alert('Password length must be between 6 and 30');
    }
    else{
    
        //sending datas using axios

        axios.post('http://localhost:5000/signup',userData)
        .then(response=>{
                  console.log(userData);
                  navigate('/main');

                })
       .catch(error=>{
            console.log(`${error} error occured!`);
        })
    

    }


}

return (
    
    <>
    <div className="signup_main">
        <div className="uname_main"><span id="uname_txt">Username</span><span id="uname_field"><input type="text" id="fielduname" onChange={(e)=>setUsername(e.target.value)}/></span></div>
        <div className="pwd_main"><span id="pwd_txt">Password</span><span id="pwd_field"><input type="password" id="fieldpwd" onChange={(e)=>setPassword(e.target.value)}/></span></div>
        <div className="signupbtn"><button id="btnsignup" onClick={handleSubmit}>Signup</button></div>
    </div>
    </>
)

}

export default Signup;