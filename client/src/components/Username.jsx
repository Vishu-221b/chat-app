import { AuthContext } from '../AuthContext';
import { useContext } from 'react';

const Username = () => {

const { user } = useContext(AuthContext); // access user from AuthContext

    return (
        <div>
            <h1>{`My name is ${user.username}`}</h1>
        </div>
    )
}

export default Username;