import {toast} from 'sonner';
import axios from 'axios';
import { User,SignIn } from '../../types/user';
import {serializeUser} from '../serializer/auth';

export const SignInAccount = async (signInValues: SignIn, language:string): Promise<User|null> => {

  let user: User | null = null;

  try {
      //const loginResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signin`, signInValues, {
        //headers: {
          //'Accept-Language':language,
        //}
      //});
      //serializeUser(loginResponse.data);
      user = { token:"1231231sdfasdf", username:"admin", id:1,email:"diego10azul@hotmail.com" }; 

  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      const errorData = error.response?.data;
      const errorMessage = errorData?.error;

      if (Array.isArray(errorMessage)) {
        // Handle validation errors (array of errors)
        errorMessage.forEach((err) => {
          toast.error(err.msg || 'Validation error occurred');
        });
      } else {
        // Handle other types of errors
        if (statusCode) {
          toast.error(`${errorData?.error || "Error during Log In."} (Code: ${statusCode})`);
        } else {
          toast.error(errorData?.error || "An error occurred.");
        }
      }
    } else {
      toast.error("An unexpected error occurred.");
    }
    console.error(error);
  }
  return user;
};
