import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import Form from "./Form";
import "./Styles/form-styles.scss";
import { FaRegEye } from "react-icons/fa";
import { PiEyeClosedThin } from "react-icons/pi";
import { FormDetailsCreateForm, FormValidate } from "../../Types/fromType";
import { comparePassword } from "../../helpers/functions";
import { validateEmail, validatePassWord, validateUserName } from "../../helpers/vaildators";
import { useNavigate } from "react-router-dom";
import ErrorFormContainer from "../Shared/components/ErrorFormContainer";
import ErrorIndicate from "../Shared/components/ErrorIndicate";
interface Props {
  setFormType: Dispatch<SetStateAction<boolean>>;
}

function CreateForm({setFormType}:Props) {
  const [passwordVisible, setPassWordVisibility] = useState<boolean>(true);
  const [confirmPasswordVisible, setConfirmPassWordVisibility] =
    useState<boolean>(true);
  const [formDetails,setFormDetails] = useState<FormDetailsCreateForm>({
    username:"",
    email:"",
    password:"",
    confirm_password:""
  })
    const [formValidate, setFormValidate] = useState<FormValidate>({
      username: null,
      email: null,
      password: null,
      confirm_password: null,
    });
  const [disableButton,setDisableButton] = useState<boolean>(true)
  const navigate = useNavigate();

  /**
   *username,email,password,check password button -> create account **/
  /**
   * setFormType
   * function setForm for setting the form to false to switch to  create account**/
  function setForm() {
    setFormType(true);
  }
  /**
   * function for showing password**/
  function showPassword() {
    setPassWordVisibility(!passwordVisible);
  }
  /* function to show the characters of the password to confirm  */
  function showConfirmPassword() {
    setConfirmPassWordVisibility(!confirmPasswordVisible);
  }

  useEffect(()=>{
      function checkValidation() {
        const isValid = Object.keys(formValidate).every(
          (key) => formValidate[key] === true
        );

        setDisableButton(!isValid)
      }
    checkValidation()
  },[formValidate])
  /* function for getting the form details and setting it to an object and for validation */
  function processFromDetails(e:ChangeEvent<HTMLInputElement>){
    const {name,value} = e.target
    setFormDetails((prev) => {
        return { ...prev, [name]: value.trim() };
    });

    const valid = validity(name,value)

    setFormValidate((prev) => {
      return {
        ...prev,[name]:valid
      };
    });
  }

  function validity(name:string,value:string):boolean{
        switch (name) {
          case "username":
            return validateUserName(value);
          case "email":
            return validateEmail(value);
          case "password":
            return (
              validatePassWord(value)
            );
          case "confirm_password":
            return (
              validatePassWord(value) &&
              comparePassword(value, formDetails.password)
            );
          default:
            return false;
        }
  }

  /* create post function */
  async function handleUser(){

    try {
        const res = await fetch('http://localhost:8000/sign-in',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                userName:formDetails.username,
                email:formDetails.email,
                password:formDetails.username
            })
        });
        if (!res.ok) {
            throw new Error("Request Failed");
        }

        const data = await res.json();
        console.log(data)
        if(data){
            navigate('/app')
        }
    } catch (error) {
        const err = error as Error;
        console.error(err.message)
    }
  }

  /* TODO
  *Work on the post
  *Create a component to send to the user if they are not filling the form properly
  */
  return (
    <>
      <Form>
        <div className=" field-container">
          <input
            placeholder="Username"
            type="text"
            name="username"
            id="username"
            value={formDetails.username}
            required
            onChange={processFromDetails}
          />
        </div>
        <div className=" field-container">
          <input
            placeholder="Email"
            type="email"
            name="email"
            id="email"
            value={formDetails.email}
            required
            onChange={processFromDetails}
          />
        </div>
        <div className=" field-container">
          <input
            placeholder="Password"
            type={passwordVisible ? "password" : "text"}
            name="password"
            id="password"
            value={formDetails.password}
            required
            onChange={processFromDetails}
          />
          {passwordVisible ? (
            <PiEyeClosedThin onClick={showPassword} className="eye" />
          ) : (
            <FaRegEye onClick={showPassword} className="eye" />
          )}
        </div>
        <div className=" field-container">
          <input
            placeholder="Confirm Password"
            type={confirmPasswordVisible ? "password" : "text"}
            name="confirm_password"
            id="confirm-password"
            value={formDetails.confirm_password}
            required
            onChange={processFromDetails}
          />
          {confirmPasswordVisible ? (
            <PiEyeClosedThin onClick={showConfirmPassword} className="eye" />
          ) : (
            <FaRegEye onClick={showConfirmPassword} className="eye" />
          )}
        </div>
        <div className="create-account-login-btn">
          <button onClick={setForm} type="button">
            <span>Click </span>to Login if you Already have an Account
          </button>
        </div>
        <button
          onClick={handleUser}
          disabled={disableButton}
          className="login-btn"
          type="button"
        >
          Create Account
        </button>
        <ErrorFormContainer>
          {!formValidate.username && (
            <ErrorIndicate
              children={"Username should be min of 3 and not contain number"}
            />
          )}
          {!formValidate.email && (
            <ErrorIndicate children={"Email not valid"} />
          )}
          {!formValidate.password && (
            <ErrorIndicate
              children={`Password should contain Upper&Lowercase,Numeric,characters`}
            />
          )}
          {!formValidate.confirm_password && (
            <ErrorIndicate
              children={`Confirm-Password should contain Upper&Lowercase,Numeric,characters and match password`}
            />
          )}
        </ErrorFormContainer>
      </Form>
    </>
  );
}

export default CreateForm;
