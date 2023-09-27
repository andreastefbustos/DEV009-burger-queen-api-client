import {
  Tabs, 
  Tab, 
  Card, 
  CardBody
} from "@nextui-org/react";
import { Users } from "./users/Users";
import { Products } from "./products/Products";
import './index.css';
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { User } from "../../types/user";
import { Product } from "../../types/product";
interface LoaderData {
  users: User[];
  products: Product[];
  tab: string;
}

function Dashboard(): JSX.Element {
  const data = useLoaderData() as LoaderData;
  let defaultTab = "users"
  if (data.tab !== undefined && data.tab !== "") {
    defaultTab = data.tab;
  }
  
  const [selected, setSelected] = useState(defaultTab);
  
  return (
    <div>
      <div className="flex w-full flex-col items-center">
        <Tabs style={{margin:"20px 0px 10px 0px"}} aria-label="Options" selectedKey={selected} onSelectionChange={(key) => setSelected(key as string)}>
          <Tab className="title" key="users" title="Users">
            <Card className="table-details">
              <CardBody>
                <Users users={data.users} />
              </CardBody>
            </Card>
          </Tab>
          <Tab className="title" key="products" title="Products">
            <Card className="table-details">
              <CardBody>
                <Products products={data.products}/>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export { Dashboard };