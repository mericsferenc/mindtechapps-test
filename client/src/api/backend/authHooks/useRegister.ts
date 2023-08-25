import axios from 'axios';
import { API } from '../../../config';
import { useHistory } from 'react-router-dom';

interface RegisterData {
  email: string;
  password: string;
}

const useRegister = () => {
  const history = useHistory();

  const register = async (registerData: RegisterData) => {
    try {
      await axios({
        method: 'POST',
        url: `${API}/register`,
        data: registerData,
      });

      history.push('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return register;
};

export default useRegister;
