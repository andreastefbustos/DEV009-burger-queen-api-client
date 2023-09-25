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
import { DetailOrder } from "./DetailOrder";
import { useState } from "react";
import { getTimeProcessOrder } from "../../utilities/getTimeProcessOrder"
import { BiTimer } from "react-icons/bi";

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

type Order = {
    client: string;
    table: string;
    products: ProductCart[];
    userId: number,
    status: OrdersStatus;
    dataEntry: string;
    dateProcessed: string
}

function KitchenOrders() {
    let orders = useLoaderData() as Order[];
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    orders = orders.filter((order: Order) => {
        return order.status != "delivered"  
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
                    <TableColumn style={{display: "flex", alignItems: "center"}}><BiTimer style={{fontSize: "30px"}}/>TIME</TableColumn>
                    <TableColumn>TABLE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody className="table-body">
                    {orders.map((order, index) => (
                        <TableRow key={index}>
                            <TableCell>{getTimeProcessOrder(order)}</TableCell>
                            <TableCell>{order.table}</TableCell>
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {selectedOrder && (
                <DetailOrder
                    order={selectedOrder}
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                />
            )}
        </div>
    );
}

export { KitchenOrders };