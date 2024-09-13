import { ReactNode } from "react";

interface Props {
  children?: ReactNode,
  font_size?:string|number
} 
function TitleMovie({ children,font_size ='1rem' }:Props) {
  return (
    <div>
      <p style={{
        fontSize:font_size
      }}>{children}</p>
    </div>
  );
}

export default TitleMovie;
