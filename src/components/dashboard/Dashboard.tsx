import { useState, useMemo } from "react";
// import { FaTrashAlt, FaEdit } from "react-icons/fa";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  User,
  Tabs, 
  Tab, 
  Card, 
  CardBody
} from "@nextui-org/react";
import { useLoaderData } from "react-router-dom";
import { VerticalDotsIcon } from "./VerticalDotsIcons";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { PlusIcon } from "./PlusIcon";
import { capitalize } from "./utils";

type User = {
  email: string;
  role: string;
  status: string;
};

const statusOptions = [
  { name: "Chef", uid: "chef" },
  { name: "Waiter", uid: "waiter" },
  { name: "Admin", uid: "admin" },
];

function Dashboard(): JSX.Element {
    const users = Object.values(useLoaderData() as Record<string, User>) as User[];
    const [statusFilter, setStatusFilter] = useState<Set<string | number>>(new Set());
    
    const filteredItems = useMemo(() => {
        let filteredUsers = [...users];

        if (statusFilter.size !== 0 && statusFilter.size !== statusOptions.length) {
            filteredUsers = filteredUsers.filter((user) => statusFilter.has(user.role));
        }
        
        return filteredUsers;
    }, [users, statusFilter]);
    
    return (
    <div>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options">
          <Tab key="users" title="Users">
            <Card>
              <CardBody>
                <div className="flex gap-3">
                  <Dropdown>
                    <DropdownTrigger className="sm:flex" aria-label="Role selection">
                      <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">Role</Button>
                    </DropdownTrigger>
                    <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Columns"
                    closeOnSelect={false}
                    selectedKeys={statusFilter}
                    selectionMode="multiple"
                    onSelectionChange={(selectedKeys) => {
                      if (Array.isArray(selectedKeys)) {
                        setStatusFilter(new Set(selectedKeys.filter(item => typeof item === 'string')));
                      } else if (selectedKeys instanceof Set) {
                        setStatusFilter(new Set(Array.from(selectedKeys).filter(item => typeof item === 'string')));
                      }
                    }}
                    >
                    {statusOptions.map((status) => (
                      <DropdownItem key={status.uid} className="capitalize">
                        {capitalize(status.name)}
                      </DropdownItem>
                    ))}
                    </DropdownMenu>
                  </Dropdown>
                  <Button color="primary" endContent={<PlusIcon />}>Add New</Button>
                </div>
                <Table aria-label="Example static collection table">
                  <TableHeader>
                    <TableColumn>EMAIL</TableColumn>
                    <TableColumn>ROLE</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map((user) => (
                    <TableRow key={user.email}>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <div className="relative flex justify-end items-center gap-2">
                          <Dropdown>
                            <DropdownTrigger>
                              <Button isIconOnly size="sm" variant="light" aria-label="More options">
                                <VerticalDotsIcon className="text-default-300" />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Opciones del usuario">
                              <DropdownItem>View</DropdownItem>
                              <DropdownItem>Edit</DropdownItem>
                              <DropdownItem>Delete</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </TableCell>
                    </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
    </div>
);
}

export { Dashboard };