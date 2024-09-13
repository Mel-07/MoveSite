import { FaStar } from "react-icons/fa";
import'../styles/rating.scss'
import { convertRating } from "../../../helpers/functions";
import React from "react";
interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  rate:string|number
}
function Rating({rate,...props}:Props) {
  return(
  <div {...props} className="rating-container">
    <span className="rating-number">{convertRating(rate)}</span>
    <FaStar className="star"/>
  </div>
  )
}

export default Rating;
