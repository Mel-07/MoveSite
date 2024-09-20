import FormBtn from "../Shared/components/Formbtn"
import FormInput from "../Shared/components/FormInput";
import { FaUser, FaPen, FaLock } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import profileImage from '../../assets/images/man-profile.jpg'
import userImageFallback from '../../assets/images/user.svg'
import { ChangeEvent, MouseEventHandler, useState } from "react";
import {FormDataProfile} from '../../Types/fromType'
import './from.scss'
import { validateEmail, validateUserName } from "../../helpers/vaildators";

function Form() {
    const [formData,setFormData] = useState<FormDataProfile>({
        name:'',
        email:'',
        password:''
    })

    const handleFromData = (e:ChangeEvent<HTMLInputElement>)=>{

        const {name,value} = e.target
        switch (name) {
          case "name":
            setFormData((prev) => ({ ...prev, [name]: value }));
            break;
          case "email":
            setFormData((prev) => ({ ...prev, [name]: value }));
            break;
          case "password":
            setFormData((prev) => ({ ...prev, [name]: value }));
            break;

          default:
            break;
        }
    }

    const handlePost = (e:MouseEvent) =>{
        e.preventDefault();
        /* test object */
        console.log(validateUserName(formData.name),validateEmail(formData.email))
        console.log(e)
    }

    console.log(formData)
  return (
    <div className=" min-h-full px-4 form-container">
      <div>
        <form action="">
          <div className="profile-container">
            <div>
              <label
                className="profile-image-container"
                htmlFor="profile-image"
              >
                <img src={profileImage} alt="profile Image" />
                <FaPen className="pen" />
              </label>
            </div>
            <input
              accept=".jpg, .jpeg, .png, .svg"
              className="select-image"
              type="file"
              id="profile-image"
            />
            <span>Image cannot be more than 250KB</span>
          </div>
          <div>
            <FormInput onChange={handleFromData} value={formData.name} error={"eroo"} icon={FaUser} type="text" name="name" />
            <FormInput onChange={handleFromData} error={null} icon={SiGmail} type="email" name="email" />
            <FormInput onChange={handleFromData} error={null} icon={FaLock} type='password' name="password" />
            <FormBtn onClick={handlePost} className=" min-w-full" title="Rest" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form