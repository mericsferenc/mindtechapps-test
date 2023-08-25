import axios from 'axios';
import { API } from '../../../config';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setUser } from '../../../redux/actions';

interface LoginData {
  email: string;
  password: string;
}

const useLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const login = async (loginData: LoginData) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${API}/login`,
        data: loginData,
      });

      dispatch(setUser(response.data));
      localStorage.setItem('user', JSON.stringify(response.data));

      history.push('/pokemon');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return login;
};

export default useLogin;
