import  { CSSProperties, HTMLAttributes } from 'react'
import { IconType } from 'react-icons';

interface Props extends HTMLAttributes<HTMLInputElement> {
  type:(
    | "text"
    | "number"
    | "password"
    | "email"
    | "date"
    | "checkbox"
    | "radio"
    | "file"
    | "hidden"
    | "submit"
    | "reset"
    | "button"
    | "search"
    | "tel"
    | "url"
    | "range"
    | "color");
    name?:string;
    className?:string
    style?:CSSProperties,
    icon?:IconType,
    value?:string|number|readonly string[]
}

function FormInput({type,name,className,style,value,icon:Icon,...props}:Props) {
  return (
    <>
      <fieldset>
        <legend>
          {Icon && <Icon />}
          <span>{name}</span>
        </legend>
        <input
        value={value}
          style={{
            borderRadius: "7px",
            minWidth: "100%",
            padding: ".3rem",
            ...style,
          }}
          type={type}
          name={name}
          className={` bg-[#0b0b0b] outline-none ${className}`}
          required
          {...props}
        />
      </fieldset>
    </>
  );
}

export default FormInput