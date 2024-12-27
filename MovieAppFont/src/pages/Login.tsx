import '../styles/Login.scss'
import LoginForm from '../components/Forms/LoginForm';
import CreateForm from '../components/Forms/CreateForm';
import appLogo from '../assets/images/svgviewer-output.svg'
import { useState } from 'react';
function Login() {

  const [formType,setFormType] = useState<boolean>(true)
  return (
    <>
      <div className="login-container">
        <div
          className={`login-movie-form-panel ${
            formType
              ? "login-movie-form-panel-login-wallpaper"
              : "login-movie-form-panel-create-account-wallpaper"
          }`}
        >
          {/* Container holding both form */}
          <div className=" login-create-from-container">
            <div className="show-container-logo">
              <div>
                <img src={appLogo} alt="logo" />
              </div>
              <div>
                <h1>Movie App</h1>
              </div>
            </div>
            {
              formType ? <LoginForm setFormType={setFormType} />:
              <CreateForm setFormType={setFormType}/>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Login