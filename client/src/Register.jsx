import {useState}  from 'react';
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function register(event){
      event.preventDefault();
    
      try {
        const response = await axios.post('http://localhost:3000/register', {username, password});
        console.log(response.data);
      } catch (error) {
        console.error('lo bhai fail ho gya:', error);
      }
    }
  
    return (
      <div className ="bg-blue-500 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl text-white ">Sign Up</h1>
      
      <form className="flex flex-col" onSubmit = {register} >
        <input value={username} onChange={ev => setUsername(ev.target.value)} className= "mt-4 p-2" type="text" placeholder="username"/>
        
        <input value={password} onChange={ev => setPassword(ev.target.value)} className= "mt-4 p-2" type="password" placeholder="Enter your password"/>
  
        <button className= "mt-4 p-2 bg-orange-300">Register</button>
      </form>
  
  
      </div>
    )
}

export default Register;