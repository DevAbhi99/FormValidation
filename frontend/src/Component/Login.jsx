import React, {useState} from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login(){

const [username, setUsername]=useState('');
const [password, setPassword]=useState('');
const navigate=useNavigate();


const handleLogin=(e)=>{

    e.preventDefault();

const userData={username, password};

if(username===''){
    alert('username is empty');

}   

if(password===''){
    alert('password is empty');
}

axios.post('http://localhost:5000/login',userData)
.then(response=>{
   if(response.data.success){
    navigate('/main');
   }
   else{
    alert('Invalid Credentials');
   }

})
.catch(err=>{
    console.log(`${err} error occurred`);
})



}

return(
    <>
    <div className="signup_main">
        <div className="uname_main"><span id="uname_txt">Username</span><span id="uname_field"><input type="text" id="fielduname" onChange={(e)=>setUsername(e.target.value)}/></span></div>
        <div className="pwd_main"><span id="pwd_txt">Password</span><span id="pwd_field"><input type="password" id="fieldpwd" onChange={(e)=>setPassword(e.target.value)}/></span></div>
        <div className="signupbtn"><button id="btnsignup" onClick={handleLogin}>Login</button></div>
    </div>
    </>
)


}

export default Login;
