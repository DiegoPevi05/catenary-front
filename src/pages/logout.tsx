import  {  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout(); // Call the logout function
    navigate('/'); // Redirect to the login page or another route
  }, [logout, navigate]);

  return null; // This component doesn't need to render anything
};

export default Logout;
