import { ReactNode } from "react";
import"../styles/from-error.scss"
interface Props {
  children:ReactNode;
}

function ErrorFormContainer({children}:Props) {
  return <ul className="from-error-container">{children}</ul>;
}

export default ErrorFormContainer