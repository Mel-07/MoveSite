import FormBtn from "../Shared/components/Formbtn"
import FormInput from "../Shared/components/FormInput";
import { FaUser, FaPen, FaLock } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
// import profileImage from '../../assets/images/man-profile.jpg'
import userImageFallback from '../../assets/images/user.svg'
import { ChangeEvent, useState } from "react";
import {FormDataProfile} from '../../Types/fromType'
import './from.scss'
import { checkFileSize, validateEmail, validatePassWord, validateUserName } from "../../helpers/vaildators";

function Form() {
    const [formData,setFormData] = useState<FormDataProfile>({
        image:null,
        name:'',
        email:'',
        password:''
    })
    const [profile,setProfile] = useState<string|null>(null)

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
          case "image":
            setFormData((prev)=>({...prev, [name]:value}))
            break;
          default:
            break;
        }
    }

    const handlePost = () => {

      if (
        validateUserName(formData.name) &&
        validateEmail(formData.email) &&
        validatePassWord(formData.password)
      ) {
        console.log("Run Post");
      } else {
        switch (false) {
          case validateUserName(formData.name):
            console.log("username not valid");

            break;
          case validateEmail(formData.email):
            console.log("email not valid");

            break;
          case validatePassWord(formData.password):
            console.log("password not valid");

            break;

          default:
            throw new Error("None of The Checks Are Valid");
        }
      }
    };

    const handleImage = (e:ChangeEvent<HTMLInputElement>) =>{
        const reader = new FileReader();
        const file = e.target.files?.[0]

        if(file){
            readImageFile(reader,file).then(()=>{
                handleFromData(e)
            })

            
        }
    }

    const readImageFile =async (reader:FileReader,file?:File)=>{
        if(!file)return

        reader.readAsDataURL(file);
        reader.addEventListener("load", () => {
            const result = reader.result; 
            if(result){
                if (
                  checkFileSize(file, {
                    sizeLimit: 2,
                    sizeType: "mb",
                    operator: "<",
                  })
                ){
                    setProfile(result as string); 
                }
            }else{
                setProfile(userImageFallback as string);
            }
        });
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
                <img src={profile ? profile :userImageFallback} alt="profile Image" />
                <FaPen className="pen" />
              </label>
            </div>
            <input
              accept=".jpg, .jpeg, .png, .svg"
              className="select-image"
              type="file"
              id="profile-image"
              name="image"
              onChange={handleImage}
            />
            <span>Image cannot be more than 2Mb</span>
          </div>
          <div>
            <FormInput onChange={handleFromData} value={formData.name} error={"eroo"} icon={FaUser} type="text" name="name" />
            <FormInput onChange={handleFromData} error={null} icon={SiGmail} type="email" name="email" />
            <FormInput onChange={handleFromData} error={null} icon={FaLock} type='password' name="password" />
            <FormBtn type='button' onClick={handlePost} className=" min-w-full" title="Rest" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form