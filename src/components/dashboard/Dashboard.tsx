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

function Dashboard(): JSX.Element {
  return (
    <div>
      <Header />
      <div className="table-user flex w-full flex-col justify-center items-center">
        <Tabs aria-label="Options">
          <Tab className="title" key="users" title="Users">
            <Card>
              <CardBody>
                <Users />
              </CardBody>
            </Card>
          </Tab>
          <Tab className="title" key="products" title="Products">
            <Card>
              <CardBody>
                <Products />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export { Dashboard };