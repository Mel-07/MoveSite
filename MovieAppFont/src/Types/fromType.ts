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
  confirm_password:string
}

export type{
    FormDataProfile,
    FormDetailsCreateForm
}