import React, {useState} from "react";
import "./login.css";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase/config";



const Login = ({checkLog}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const auth = getAuth();


  const entrar = () => {
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        checkLog();
        
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div id="loginContainer">
      <div id="topLogin"></div>
      <div id="formLogin">
        <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder="Senha" onChange={(e)=>setPassword(e.target.value)}/>
      </div>
      <div id="lembrar">
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
        <span id="lembrar">Lembrar</span>
      </div>

      <button id="entrar" onClick={() => entrar()}>Entrar</button>
    </div>
  );
};

export default Login;
