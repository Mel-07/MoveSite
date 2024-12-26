import FormBtn from "../Shared/components/Formbtn"
import FormInput from "../Shared/components/FormInput";
import { FaUser, FaPen, FaLock, FaExclamation } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import userImageFallback from '../../assets/images/user.svg'
import { ChangeEvent, useEffect, useState } from "react";
import './from.scss'
import '../Shared/styles/from-error.scss'
import { checkFileSize, } from "../../helpers/vaildators";
import { useGetProfileQuery, usePostProfileMutation } from "../../app_state/Query/movie";
import { useAppDispatch, useAppSelector } from "../../app_state/hooks";
import { setFormData, setProfileData } from "../../app_state/app_logic/state";

function Form() {
  const dispatch = useAppDispatch();
  const {email:{
    email,
    emailIsValid
  },userName:{
    userName,
    userNameIsValid
  },password:{
    password,
    passwordIsValid
  },image} = useAppSelector(state => state.movieSlice.formData)
    // const [formData,setFormData] = useState<FormDataProfile>({
    //     image:null,
    //     userName:'',
    //     email:'',
    //     password:''
    // })
    const [formError,setFormError] = useState({
        image:false,
        name:false,
        email:false,
        password:false
    })
    const {data:profileData} = useGetProfileQuery()
    const [postProfile] = usePostProfileMutation()
    const [profile,setProfile] = useState<string|null>(null)


    useEffect (()=>{
      if(profileData){
        dispatch(setProfileData(
          {
            ...profileData
          }
        ));
      }
    },[dispatch,profileData])

    const handleFromData = (e:ChangeEvent<HTMLInputElement>)=>{

        const {name,value} = e.target

        dispatch(setFormData({
          name,value
        }))
        // switch (name) {
        //   case "userName":{
        //     setFormData((prev) => ({ ...prev, [name]: value }));
        //       if (validateUserName(value)) {
        //         setFormError((prev) => ({ ...prev, name: false }));
        //       } else {
        //         setFormError((prev) => ({ ...prev, name: true }));
        //       }
        //   }
        //     break;
        //   case "email":{
        //     setFormData((prev) => ({ ...prev, [name]: value }));
        //       if (validateEmail(value)) {
        //         setFormError((prev) => ({ ...prev, email: false }));
        //       } else {
        //         setFormError((prev) => ({ ...prev, email: true }));
        //       }
        //   }
        //     break;
        //   case "password":{
        //     setFormData((prev) => ({ ...prev, [name]: value }));
        //       if (validatePassWord(value)) {
        //         setFormError((prev) => ({ ...prev, password: false }));
        //       } else {
        //         setFormError((prev) => ({ ...prev, password: true }));
        //       }
        //   }
        //     break;
        //   case "image":
        //     setFormData((prev)=>({...prev, [name]:value}))
        //     break;
        //   default:
        //     break;
        // }
    }

    const handlePost = () => {

      if (
        userNameIsValid &&
        emailIsValid &&
        passwordIsValid
      ) {
       async function postToProfile(){

        try {

          await postProfile({
            userName,
            image,
            email,
            password
          })
        } catch (error) {
            console.log(error)
        }
       }
       postToProfile()
      }
      else{
            // if (validatePassWord(password)) {
            // setFormError((prev) => ({ ...prev, password: false }));
            // } else {
            // setFormError((prev) => ({ ...prev, password: true }));
            // }
            // if (validateEmail(formData.email)) {
            // setFormError((prev) => ({ ...prev, email: false }));
            // } else {
            // setFormError((prev) => ({ ...prev, email: true }));
            // }
            // if (validateUserName(formData.userName)) {
            // setFormError((prev) => ({ ...prev, name: false }));
            // } else {
            // setFormError((prev) => ({ ...prev, name: true }));
            // }
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
                    setProfile(result?.toString()); 
                    setFormError((prev)=>({...prev,image:false}))
                }else{
                    setFormError((prev) => ({ ...prev, image: true }));
                    setProfile(userImageFallback as string);
                }
            }
        });
    }

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
                <img
                  src={profile ? profile : userImageFallback}
                  alt="profile Image"
                />
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
          </div>
          <div>
            <FormInput
              onChange={handleFromData}
              value={
                 userName 
              }
              icon={FaUser}
              type="text"
              name="userName"
            />
            <FormInput
              onChange={handleFromData}
              value={email}
              icon={SiGmail}
              type="email"
              name="email"
            />
            <FormInput
              onChange={handleFromData}
              value={password}
              icon={FaLock}
              type="password"
              name="password"
            />
            <FormBtn
              type="button"
              onClick={handlePost}
              className=" min-w-full"
              title="Rest"
            />
          </div>

          <ul className="from-error-container">
            {!userNameIsValid && (
              <li>
                <FaExclamation className="exclamation" />
                <span>Name should have a Min length of 3</span>
              </li>
            )}
            {!emailIsValid && (
              <li>
                <FaExclamation className="exclamation" />
                <span>Invalid Email</span>
              </li>
            )}
            {!passwordIsValid && (
              <li>
                <FaExclamation className="exclamation" />
                <span>
                  Password should contain a lower,uppercase,character,digit
                </span>
              </li>
            )}
            {formError.image && (
              <li>
                <FaExclamation className="exclamation" />
                <span>Image cannot be more than 2Mb</span>
              </li>
            )}
          </ul>
        </form>
      </div>
    </div>
  );
}

export default Form