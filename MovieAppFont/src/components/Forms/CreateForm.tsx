import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Form from "./Form";
import "./Styles/form-styles.scss";
import { FaRegEye } from "react-icons/fa";
import { PiEyeClosedThin } from "react-icons/pi";
import { FormDetailsCreateForm } from "../../Types/fromType";
import { comparePassword } from "../../helpers/functions";
interface Props {
  setFormType: Dispatch<SetStateAction<boolean>>;
}

function CreateForm({setFormType}:Props) {
  const [passwordVisible, setPassWordVisibility] = useState<boolean>(true);
  const [confirmPasswordVisible, setConfirmPassWordVisibility] =
    useState<boolean>(true);
  const [formDetails,setFormDetails] = useState<FormDetailsCreateForm>({
    username:'',
    email:'',
    password:'',
    confirm_password:''
  })

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
  /* function for getting the form details and setting it to an object */
  function processFromDetails(e:ChangeEvent<HTMLInputElement>){
    const {name,value} = e.target

    switch (name) {
      case "username":
        {
          setFormDetails((prev)=>{
            return{...prev,[name]:value}
          })
        }
        break;
      case "email":
        {
            setFormDetails((prev) => {
              return { ...prev, [name]: value };
            });
        }
        break;
      case "password":
        {
          setFormDetails((prev) => {
            return { ...prev, [name]: value };
          });
        if (!comparePassword(value,formDetails.confirm_password)) {
                    console.log("password are not the same");
        }
        }
        break;
      case "confirm_password":
        {
        setFormDetails((prev) => {
        return { ...prev, [name]: value };
        });
        if(!comparePassword(formDetails.password,value)){
            console.log('password are not the same')
        }
        }
        break;

      default:
        break;
    }
  }
  /* create post function */
  async function handleUser(){

    
    try {
        const res = await fetch("http://localhost:8000/sign-in",{
            method:'POST',
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
                userName:formDetails.username,
                email:formDetails.email,
                password:formDetails.password
            })
        });

        const data = await res.json()

        console.log(data)
    } catch (error ) {
        /* handle error */
        console.log(error)
    }
  }
  return (
    <Form>
      <div className=" field-container">
        <input
          placeholder="Username"
          type="text"
          name="username"
          id="username"
          required={true}
          onChange={processFromDetails}
        />
      </div>
      <div className=" field-container">
        <input
          placeholder="Email"
          type="email"
          name="email"
          id="email"
          required={true}
          onChange={processFromDetails}
        />
      </div>
      <div className=" field-container">
        <input
          placeholder="Password"
          type={passwordVisible ? "password" : "text"}
          name="password"
          id="password"
          required={true}
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
          required={true}
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
      <button onClick={handleUser} className="login-btn" type="button">
        Login
      </button>
    </Form>
  );
}

export default CreateForm;
