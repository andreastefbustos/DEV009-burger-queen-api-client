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
    useDisclosure} from "@nextui-org/react";
import { useLoaderData } from "react-router-dom";
import { EyeIcon } from "../../utilities/EyeIcon";
import { ModalButtonOrderDetail } from "./ModalButtonDetailsOrder";
import { useState } from "react";

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

function MyOrders() {
    const orders = useLoaderData() as Orders[];
    const [selectedOrder, setSelectedOrder] = useState<Orders | null>(null);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const user = JSON.parse(localStorage.getItem("user") as string)
    const filteredOrders = orders.filter((order) => {
        return order.userId === user.id
    })

    const statusColorMap: Record<string, ChipProps["color"]> = {
        pending: "warning",
        ready: "success",
        delivered: "default",
    }

    return (
        <div className="order-details">
            <Table isHeaderSticky aria-label="Orders"  className="table-container">
                <TableHeader>
                    <TableColumn>TABLE</TableColumn>
                    <TableColumn>CLIENT</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                    <TableColumn>DATE ORDER</TableColumn>
                    <TableColumn>DATE DELIVERED</TableColumn>
                </TableHeader>
                <TableBody className="table-body">
                    {filteredOrders.map((order, index) => (
                        <TableRow key={index}>
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
                            <TableCell>{order.dataEntry}</TableCell>
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
    );
}

export { MyOrders };