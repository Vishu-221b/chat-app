import {Link} from "react-router-dom";

function Login(){
    return(
        <div className="bg-blue-500 min-h-screen flex flex-col justify-center items-center">
        <form className="flex flex-col">

            <input className="p-4 mt-4" type="text" placeholder="username"/>
            <input className="p-4 mt-4" type="password" placeholder="password"/>
            <button className="p-4 mt-4 bg-orange-400">LOG IN</button>

        </form>
        </div>
        
    )
}

export default Login;