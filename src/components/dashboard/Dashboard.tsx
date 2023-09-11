import {
  Tabs, 
  Tab, 
  Card, 
  CardBody
} from "@nextui-org/react";
import { Users } from "./users/Users";
import { Products } from "./products/Products";
import './index.css';
import { Header } from "../../components/Header";
import { useLoaderData } from "react-router-dom";

type User = {
  id: number;
  email: string;
  role: string;
  status: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  type: string;
  dateEntry: string;
};
interface LoaderData {
  users: User[];
  products: Product[];
}

function Dashboard(): JSX.Element {
  const data = useLoaderData() as LoaderData
  
  return (
    <div>
      <Header />
      <div className="table-user flex w-full flex-col justify-center items-center">
        <Tabs aria-label="Options">
          <Tab className="title" key="users" title="Users">
            <Card>
              <CardBody>
                <Users users={data.users} />
              </CardBody>
            </Card>
          </Tab>
          <Tab className="title" key="products" title="Products">
            <Card>
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