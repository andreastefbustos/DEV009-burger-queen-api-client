import {
  Tabs, 
  Tab, 
  Card, 
  CardBody
} from "@nextui-org/react";
import { Users } from "./Users";

function Dashboard(): JSX.Element {
  return (
  <div className="flex w-full flex-col">
    <Tabs aria-label="Options">
      <Tab key="users" title="Users">
        <Card>
          <CardBody>
            <Users />
          </CardBody>
        </Card>
      </Tab>
      <Tab key="products" title="Products">
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