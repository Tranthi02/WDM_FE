import { useNavigate } from "react-router-dom";
import { useContext, useState } from 'react';
import styled from "styled-components";
import Wedding from "../assets/images/image";
import { login } from '../api/auth.api';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from "../context/auth.context";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const navigate = useNavigate();
  const { setToken } = useContext(AuthContext)

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(username, password)
      const token = res.data.access_token;
      localStorage.setItem('token', token);
      setToken(token); 
      setUsername('');
      setPassword('');
      // navigate('/dashboard', { replace: true });

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleUserNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <LoginPage>
      <ToastContainer />
      <LoginForm onSubmit={(e) => handleLoginSubmit(e)}>
        <div className="image">
          <img src={Wedding} alt="" />
        </div>
        <p>Wedding</p>
        <InputField
          onChange={(e) => handleUserNameChange(e)}
          type="text"
          id="username"
          name="username"
          required
          placeholder="Username"
          value={username}
        />
        <InputField
          onChange={(e) => handlePasswordChange(e)}
          type="password"
          id="password"
          name="password"
          required
          placeholder="Password"
          value={password}
        />
        <SubmitButton type="submit" id="login" value="Login" />
      </LoginForm>
    </LoginPage>
  );
};

export default Login;

const LoginPage = styled.div`
  background-color: white;
  width: 100vw; 
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.form`
  width: 30%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 2% 35px;
  background-color: #dbdbdb;

  .image{
    height: 40%;
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img{
    width: 100%;
    height: 100%;
  }

  p{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.5em;
    font-weight: 600;
  }
`;

const InputField = styled.input`
  height: 10%; 
  background-color: white;
  border-radius: 40px;
  padding: 5%;
  font-size: 1.5em;
  border: 1px rgb(181, 192, 208) solid;
`;

const SubmitButton = styled.input`
  height: 10%; 
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  color: white;
  border-radius: 40px;
  font-size: 1.5em;
  
  &:hover {
    cursor: pointer;
  }
`;
