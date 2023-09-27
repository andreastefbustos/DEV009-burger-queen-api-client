import { FaUserCircle } from "react-icons/fa";
import headerImg from "../assets/img/header.png";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function Header ({excludes}: {excludes: string[]}): JSX.Element {
  const navigate = useNavigate();

  const onSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate('/');
  }

  const menu = () => {
    navigate('/menu')
  }

  const orders = () => {
    navigate('orders')
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
            {!excludes.includes("menu") && (
            <DropdownItem key="menu" onClick={menu}>
              Menu
            </DropdownItem>
            )}

            {!excludes.includes("orders") && (
            <DropdownItem key="order" onClick={orders}>
                Orders
            </DropdownItem>
            )}
            
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