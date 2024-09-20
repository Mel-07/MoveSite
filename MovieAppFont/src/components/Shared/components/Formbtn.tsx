import { HTMLAttributes} from "react"


interface Props extends HTMLAttributes<HTMLButtonElement>{
    title:string,
    className:string
}

function FormBtn({title,className,...props}:Props) {
    console.log(props)
  return (
    <button
      className={`bg-[#ff4400a1] my-4 hover:bg-[#ff4500] transition-colors duration-200 ease-in-out rounded-[5px] p-2 font-semibold ${className}`}
      {...props}
    >
      {title}
    </button>
  );
}

export default FormBtn