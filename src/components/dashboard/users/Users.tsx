import { useState, useMemo } from "react";
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
    useDisclosure,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { VerticalDotsIcon } from "../../../utilities/VerticalDotsIcons";
import { ChevronDownIcon } from "../../../utilities/ChevronDownIcon";
import { PlusIcon } from "../../../utilities/PlusIcon";
import { capitalize } from "../../../utilities/utils";
import { Data, ModalConfirmDelete } from "../../commons/ModalConfirmDelete";

type User = {
    id: number;
    email: string;
    role: string;
    status: string;
};

interface UsersProps {
    users: User[];
}

const statusOptions = [
  { name: "Chef", uid: "chef" },
  { name: "Waiter", uid: "waiter" },
  { name: "Admin", uid: "admin" },
];

function Users({users}: UsersProps): JSX.Element {
    const [statusFilter, setStatusFilter] = useState<Set<string | number>>(new Set());
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const filteredItems = useMemo(() => {
        let filteredUsers = [...users];

        if (statusFilter.size !== 0 && statusFilter.size !== statusOptions.length) {
            filteredUsers = filteredUsers.filter((user) => statusFilter.has(user.role));
        }
        
        return filteredUsers;
    }, [users, statusFilter]);
    
    const data: Data = {
        id: selectedUser?.id as number,
        title: "Confirmation to delete a user",
        message: `Are you sure you want to delete this user ${selectedUser?.email}?`,
        intent: "user-delete"
    };
    
    return (
        <div>
            <div className="flex gap-3">
                <Dropdown>
                    <DropdownTrigger className="sm:flex" aria-label="Role selection">
                      <Button 
                      endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                        Role
                      </Button>
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
                <Button color="primary" endContent={<PlusIcon />}>
                    <Link to="users/create">Add New</Link>
                </Button>
            </div>
            <div className="table_information">
                <Table aria-label="table">
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
                                                <DropdownItem textValue="Edit">
                                                    <Link to={`users/${user.id}/update`}>Edit</Link>
                                                    </DropdownItem>
                                                <DropdownItem onPress={() => {
                                                    setSelectedUser(user);
                                                    onOpen()
                                                }}>Delete</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <ModalConfirmDelete 
                data={data} 
                isOpen={isOpen} 
                onOpenChange={onOpenChange}
            />
        </div>
    );
}

export { Users };