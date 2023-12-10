import { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate} from 'react-router-dom';
import Profile from './Profile.jsx';


const PrivateRoute = ({ children, ...props }) => {
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
          navigate('/login');
        }
      }, [isLoggedIn, navigate]);
    
      if (!isLoggedIn) {
        return null;
      }

      return <Profile />;
}

export default PrivateRoute;