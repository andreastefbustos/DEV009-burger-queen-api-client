import { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  // Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  // Chip,
  User,
  // Pagination,
} from "@nextui-org/react";
import { useLoaderData } from "react-router-dom";
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

export function Dashboard() {
  const users = Object.values(useLoaderData() as Record<string, User>) as User[];
    const [filterValue, setFilterValue] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredItems = useMemo(() => {
        let filteredUsers = [...users];

        if (statusFilter !== "all" && statusFilter.length !== statusOptions.length) {
            console.log("filterValue", statusFilter)
            filteredUsers = filteredUsers.filter((user) =>
                Array.from(statusFilter).includes(user.role)
            );
        }

        return filteredUsers;
    }, [users, filterValue, statusFilter]);

return (
  // Center the div
  <div>
      <h1>Dashboard</h1>
      <div className="flex gap-3">
          <Dropdown>
              <DropdownTrigger className="sm:flex">
                  <Button endContent="" variant="flat">
                  Role
                  </Button>
              </DropdownTrigger>
              <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={statusFilter}
                  selectionMode="multiple"
                  onSelectionChange={setStatusFilter}>
                      {statusOptions.map((status) => (
                      <DropdownItem key={status.uid} className="capitalize">
                          {capitalize(status.name)}
                      </DropdownItem>
                      ))}
              </DropdownMenu>
          </Dropdown>
          <Button color="primary">
          Add New
          </Button>
      </div>
      <Table aria-label="Example static collection table">
          <TableHeader>
              <TableColumn>Email</TableColumn>
              <TableColumn>Role</TableColumn>
          </TableHeader>
          <TableBody>
              {filteredItems.map((user) => (
                  <TableRow key={user.email}>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                  </TableRow>
              ))}
          </TableBody>
      </Table>
  </div>
);

}