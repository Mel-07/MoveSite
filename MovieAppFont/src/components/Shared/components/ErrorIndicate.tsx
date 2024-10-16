import { ReactNode } from "react"
import { FaExclamation } from "react-icons/fa6"

interface Props {
    children:ReactNode
}

function ErrorIndicate({children}:Props) {
  return (
    <li>
      <FaExclamation className="exclamation" />
      <span>{children}</span>
    </li>
  );
}

export default ErrorIndicate