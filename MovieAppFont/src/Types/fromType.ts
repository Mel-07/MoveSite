interface FormDataProfile {
  image:string|null
  userName: string;
  email: string;
  password: string;
}

interface FormDetailsCreateForm {
  username:string,
  email:string,
  password:string,
  confirm_password:string,
  [key: string] :string
}
interface FormValidate {
  username: boolean|null;
  email: boolean|null;
  password: boolean|null;
  confirm_password: boolean|null;
  [key: string]: boolean|null;
}
interface FormValidateLogin {
  username: boolean | null;
  password: boolean | null;
  [key: string]: boolean | null;
}
interface FormDetailsLoginForm {
  username: string;
  password: string;
  [key: string]: string;
}
export type{
    FormDataProfile,
    FormDetailsCreateForm,
    FormValidate,
    FormDetailsLoginForm,
    FormValidateLogin
}