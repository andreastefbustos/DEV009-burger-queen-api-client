import { 
    Table, 
    TableHeader, 
    TableColumn, 
    TableBody, 
    TableRow, 
    TableCell,
    Tooltip,
    Chip,
    ChipProps,
    useDisclosure,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    Button,
    DropdownItem} from "@nextui-org/react";
import { useLoaderData } from "react-router-dom";
import { EyeIcon } from "../../utilities/EyeIcon";
import { ModalButtonOrderDetail } from "./ModalButtonDetailsOrder";
import { useState } from "react";
import { ChevronDownIcon } from "../../utilities/ChevronDownIcon";
import { capitalize } from "../../utilities/utils";

type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    type: string;
    dateEntry: string;
};

type ProductCart = {
    qty: number;
    product: Product
}

type OrdersStatus = "pending" | "ready" | "delivered";

type Orders = {
    client: string;
    table: string;
    products: ProductCart[];
    userId: number,
    status: OrdersStatus;
    dataEntry: string;
    dateProcessed: string;
    id: string;
}

const statusOptions = [
    { name: "Pending", uid: "pending" },
    { name: "Ready", uid: "ready" },
    { name: "Delivered", uid: "delivered" },
];

function MyOrders() {
    const orders = useLoaderData() as Orders[];
    const [selectedOrder, setSelectedOrder] = useState<Orders | null>(null);
    const [statusFilter, setStatusFilter] = useState<Set<string | number>>(new Set(['ready', 'pending']));
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const user = JSON.parse(localStorage.getItem("user") as string)
    const filteredOrders = orders.filter((order) => {
        const belongsToCurrentWaiter = order.userId === user.id;

        const matchesStatusFilter = statusFilter.size === 0 || statusFilter.size === statusOptions.length || statusFilter.has(order.status)

        return belongsToCurrentWaiter && matchesStatusFilter;
    })

    const statusColorMap: Record<string, ChipProps["color"]> = {
        pending: "warning",
        ready: "success",
        delivered: "default",
    }

    return (
        <div>
            <div className="status-selection flex gap-3">
                <Dropdown className="sm:flex" aria-label="Status selection">
                    <DropdownTrigger>
                        <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                            Status
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Columns"
                    defaultSelectedKeys={['ready', 'pending']}
                    closeOnSelect={false}
                    selectedKeys={statusFilter}
                    selectionMode="multiple"
                    onSelectionChange={(selectedKeys) => {
                        if (Array.isArray(selectedKeys)) {
                            setStatusFilter(new Set(selectedKeys.filter(item => typeof item === 'string')));
                        } else if (selectedKeys instanceof Set) {
                            setStatusFilter(new Set(Array.from(selectedKeys).filter(item => typeof item === 'string')));
                        }
                    }}>
                        {
                            statusOptions.map((status) => (
                                <DropdownItem key={status.uid} className="capitalize">
                                    {capitalize(status.name)}
                                </DropdownItem>
                            ))
                        }
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div className="order-details">
            <Table isHeaderSticky aria-label="Orders"  className="table-container">
                <TableHeader>
                    <TableColumn>ORDER CREATION</TableColumn>
                    <TableColumn>TABLE</TableColumn>
                    <TableColumn>CLIENT</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                    <TableColumn>DELIVERED</TableColumn>
                </TableHeader>
                <TableBody className="table-body">
                    {filteredOrders.map((order, index) => (
                        <TableRow key={index}>
                            <TableCell>{order.dataEntry}</TableCell>
                            <TableCell>{order.table}</TableCell>
                            <TableCell>{order.client}</TableCell>
                            <TableCell>
                                <Chip className="capitalize" color={statusColorMap[order.status]} size="sm" variant="flat">
                                    {order.status}
                                </Chip>
                            </TableCell>
                            <TableCell>
                                <div className="relative flex items-center justify-center gap-2">
                                    <Tooltip content="Details">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <EyeIcon onClick={()=> {
                                                setSelectedOrder(order)
                                                onOpen()
                                            }} />
                                        </span>
                                    </Tooltip>
                                </div>
                            </TableCell>
                            <TableCell>{order.dateProcessed}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {selectedOrder && (
                <ModalButtonOrderDetail
                    order={selectedOrder}
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                />
            )}
            </div>
        </div>
    );
}

export { MyOrders };