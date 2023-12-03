
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from 'react-router-dom';


function Login(){
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const { isLoggedIn, login } = useContext(AuthContext);

const navigate = useNavigate(); 

const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile'); 
      console.log("Login successful");
    }
  }, [isLoggedIn]);


    return(
        <div className="bg-blue-500 min-h-screen flex flex-col justify-center items-center">
        <form className="flex flex-col" onSubmit = {handleSubmit}>

            <input value = {username} onChange = {(e) => setUsername(e.target.value)} className="p-4 mt-4" type="text" placeholder="username"/>
            <input value = {password} onChange = {(e) => setPassword(e.target.value)} className="p-4 mt-4" type="password" placeholder="password"/>
            <button type="submit" className="p-4 mt-4 bg-orange-400">LOG IN</button>

        </form>
        </div>
        
    )
}

export default Login;