import { FaUserCircle } from "react-icons/fa";
import headerImg from "../assets/header.png";

function Header () {
    return (
        <div className="headerContainer" style={{backgroundImage: `url(${headerImg})`}}>
            <FaUserCircle className="userIcon"/>
        </div>
    );
}

export { Header };