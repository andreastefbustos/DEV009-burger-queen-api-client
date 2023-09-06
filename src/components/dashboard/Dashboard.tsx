import {
  Tabs, 
  Tab, 
  Card, 
  CardBody
} from "@nextui-org/react";
import { Users } from "./Users";
import './index.css';

function Dashboard(): JSX.Element {
  return (
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

          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  </div>
  );
}

export { Dashboard };