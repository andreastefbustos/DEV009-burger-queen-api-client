import { FaUserCircle } from "react-icons/fa";
import headerImg from "../assets/header.png";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

function Header () {
    return (
        <div className="headerContainer" style={{backgroundImage: `url(${headerImg})`}}>
            <Dropdown>
                <DropdownTrigger>
                    <div>
                    <FaUserCircle className="userIcon"/>
                    </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="delete" className="text-danger" color="danger">
                        Sign out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

export { Header };