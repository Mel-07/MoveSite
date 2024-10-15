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
  username: boolean;
  email: boolean;
  password: boolean;
  confirm_password: boolean;
  [key: string]: boolean;
}
export type{
    FormDataProfile,
    FormDetailsCreateForm,
    FormValidate
}