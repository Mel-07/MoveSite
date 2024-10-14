import { Dispatch, SetStateAction, useState } from 'react';
import Form from './Form';
import './Styles/form-styles.scss'
import { FaRegEye } from "react-icons/fa";
import { PiEyeClosedThin } from "react-icons/pi";
interface Props {
  setFormType: Dispatch<SetStateAction<boolean>>
}
function LoginForm({setFormType}:Props) {

  const [passwordVisible,setPassWordVisibility] = useState<boolean>(true)
  /* Username and password */
/**
 * setFormType 
 * function setForm for setting the form to false to switch to  create account**/
  function setForm(){
    setFormType(false)
  }
  /**
   * function for showing password**/
  function showPassword(){
    setPassWordVisibility(!passwordVisible)
  }
  return (
    <Form>
      <div className=" field-container">
        <input type="text" name="username" id="username" required={true} />
      </div>
      <div className=" field-container">
        <input
          type={passwordVisible ? "password" : "text"}
          name="password"
          id="password"
          required={true}
        />
        {passwordVisible ? (
          <PiEyeClosedThin onClick={showPassword} className="eye" />
        ) : (
          <FaRegEye onClick={showPassword} className="eye" />
        )}
      </div>
      <div className="create-account-login-btn">
        <button onClick={setForm} type="button">
          <span>Click </span>to Create Account
        </button>
      </div>
      <button className="login-btn" type="button">
        Login
      </button>
    </Form>
  );
}

export default LoginForm