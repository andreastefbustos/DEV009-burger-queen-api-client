import { FaUserCircle } from "react-icons/fa";
import headerImg from "../assets/header.png";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";


function Header (): JSX.Element {
    const navigate = useNavigate();

    const onSignOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate('/');
    }

    return (
        <div className="headerContainer" style={{backgroundImage: `url(${headerImg})`}}>
            <Dropdown>
                <DropdownTrigger>
                    <div>
                    <FaUserCircle className="userIcon"/>
                    </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem 
                    key="delete" 
                    className="text-danger" 
                    color="danger" 
                    onClick={onSignOut}>
                        Sign out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

export { Header };