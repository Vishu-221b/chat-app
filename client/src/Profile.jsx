import React from 'react';
import { Link } from 'react-router-dom';
import Username from './components/Username';

function Profile() {
  return (
    <div>
      <h1>Welcome to the new page!</h1>
      <Link to="/"><button className="bg-orange-400 p-4">Go back to home</button></Link>
       <Username />
    </div>
  );
}

export default Profile;