
interface Props {
    text:string,
    fontSize?:string,
    fontFamily?:string,
}

function H1({text,fontSize="1rem",fontFamily}:Props) {
  return (
    <h1 style={{
        fontSize:fontSize,
    }} className={`${fontFamily} p-2`}>
      {text}
    </h1>
  )
}

export default H1
