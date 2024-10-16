import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import Form from './Form';
import './Styles/form-styles.scss'
import { FaRegEye } from "react-icons/fa";
import { PiEyeClosedThin } from "react-icons/pi";
import ErrorFormContainer from '../Shared/components/ErrorFormContainer';
import ErrorIndicate from '../Shared/components/ErrorIndicate';
import { validatePassWord, validateUserName } from '../../helpers/vaildators';
import { FormValidateLogin } from '../../Types/fromType';
interface Props {
  setFormType: Dispatch<SetStateAction<boolean>>
}
function LoginForm({setFormType}:Props) {

  const [passwordVisible,setPassWordVisibility] = useState<boolean>(true)
  /* Username and password */
  const [loginDetials, setLoginDetails] = useState({
    username:'',
    password:''
  })
  /* state for validating the input  */
  const [formValidate, setFormValidate] = useState<FormValidateLogin>({
    username: false,
    password: false,
  });
  const [disableBtn, setDisableBtn] = useState<boolean>(true)

  useEffect(()=>{
    function checkValidity(){
      const valid = Object.keys(formValidate).every((key) => formValidate[key] === true);
      setDisableBtn(!valid)
    }
    checkValidity()
  },[formValidate])
  /**
   * function for handling change event */
  function handleInput(e:ChangeEvent<HTMLInputElement>){
    const {name,value} = e.target
    setLoginDetails((prev)=>{
      return{
        ...prev,[name]:value
      }
    })

    const valid = validity(name,value)

    setFormValidate((prev)=>{
      return{
        ...prev,[name]:valid
      }
    })
  }
  /* validity function */
  function validity(name:string,value:string):boolean{
    switch (name) {
      case "username":
        {
          return validateUserName(value)
        }
      case "password": {
        return validatePassWord(value)
      }

      default: return false
    }
  } 
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
        <input
          type="text"
          name="username"
          id="username"
          required
          placeholder="Username"
          onChange={handleInput}
          value={loginDetials.username}
        />
      </div>
      <div className=" field-container">
        <input
          type={passwordVisible ? "password" : "text"}
          name="password"
          id="password"
          required
          placeholder="Password"
          onChange={handleInput}
          value={loginDetials.password}
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
      <button className="login-btn" type="button" disabled={disableBtn}>
        Login
      </button>
      <ErrorFormContainer>
        {!formValidate.username && (
          <ErrorIndicate
            children={`Username should be min of 3 and not contain number`}
          />
        )}
        {!formValidate.password && (
          <ErrorIndicate
            children={`Password should contain Upper&Lowercase,Numeric,characters`}
          />
        )}
      </ErrorFormContainer>
    </Form>
  );
}

export default LoginForm