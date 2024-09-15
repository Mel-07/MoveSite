import './header.scss'
import { NavLink,Link } from "react-router-dom";
import MovieLogo from '../../assets/images/svgviewer-output.svg'
import profileImage from '../../assets/images/man-profile.jpg'
import {
  FaHouseChimney,
  FaGripfire,
  FaBookmark,
  FaDiceSix,
  FaDoorOpen,
} from "react-icons/fa6";
import { useState } from 'react';
import { newdata } from '../../data/moviType&Ids';
import { joinAndRandomizeArray } from '../../helpers/functions';
const getRandomIndex = joinAndRandomizeArray(
  true,
  Array.from({ length: newdata.length }).map((_, i) => i)
)[0] as unknown;
const randomIndex = Array.isArray(getRandomIndex)
  ? getRandomIndex[0]
  : getRandomIndex;


function Header() {

    const [idType,] = useState<string | null>(
      newdata[randomIndex].id.toString()
    );
    const [movieType,] = useState<string | null>(
      newdata[randomIndex].media_type
    );
  return (
    <header className="header-container">
      <nav className="nav-container">
        <Link to={"/"}>
          <img src={MovieLogo} width={"100%"} alt="" />
        </Link>
        <ul className="nav-lists">
          <li title="Home">
            <NavLink
              className={({ isActive }) => (isActive ? "text-[#0b0b0b]" : "")}
              to={"/"}
            >
              <FaHouseChimney />
            </NavLink>
          </li>
          <li title="Top-rated">
            <NavLink
              className={({ isActive }) => (isActive ? "text-[#0b0b0b]" : "")}
              to={"/top-rated"}
            >
              <FaGripfire />
            </NavLink>
          </li>
          <li title="Bookmark">
            <NavLink
              className={({ isActive }) => (isActive ? "text-[#0b0b0b]" : "")}
              to={"/bookmark"}
            >
              <FaBookmark />
            </NavLink>
          </li>
          <li title="Title">
            <NavLink
              className={({ isActive }) => (isActive ? "text-[#0b0b0b]" : "")}
              to={`/title?id=${idType}&type=${movieType}`}
            >
              <FaDiceSix />
            </NavLink>
          </li>
        </ul>

        <ul className=" nav-lists">
          <li title="Profile">
            <Link to={"/profile"}>
              <img src={profileImage} alt="" />
            </Link>
          </li>
          <li title="Logout">
            <Link to={""}>
              <FaDoorOpen />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header
