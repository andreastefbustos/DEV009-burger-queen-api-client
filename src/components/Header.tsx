import { FaUserCircle } from "react-icons/fa";
import headerImg from "../assets/img/header.png";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

interface Link {
  key: string
  label: string
  onClick: () => void
}


function Header ({excludes}: {excludes: string[]}): JSX.Element {
  const navigate = useNavigate();

  const onSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate('/');
  }

  const list: Link[] = [];

  if(!excludes.includes("menu")) {
    list.push({key: "menu", label: "Menu", onClick: () => {navigate("/menu")}});
  }

  if(!excludes.includes("orders")) {
    list.push({key: "orders", label: "Orders",  onClick: () => {navigate("orders")}});
  }

  list.push({key: "signout", label: "Sign Out", onClick: onSignOut})


  return (
    <div className="headerContainer" style={{backgroundImage: `url(${headerImg})`}}>
      <Dropdown>
        <DropdownTrigger>
            <div>
              <FaUserCircle className="userIcon"/>
            </div>
        </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions" items={list}>
            {(item) => {
              const itemLink = item as Link;
              return (
                <DropdownItem 
                key={itemLink.key} 
                onClick={itemLink.onClick} 
                color={itemLink.key === "signout" ? "danger" : "default"} 
                className={itemLink.key === "signout" ? "text-danger" : ""}>
                  {itemLink.label}
                </DropdownItem>
            )}}
          </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export { Header };
