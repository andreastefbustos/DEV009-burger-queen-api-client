import { 
    Table, 
    TableHeader, 
    TableColumn, 
    TableBody, 
    TableRow, 
    TableCell,
    Tooltip,
    Chip} from "@nextui-org/react";
import { useLoaderData } from "react-router-dom";
import { EyeIcon } from "../../utilities/EyeIcon";


type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    type: string;
    dateEntry: string;
};

type Orders = {
    client: string;
    table: string;
    products: Product;
    userId: number,
    status: string;
    dataEntry: string;
}

function MyOrders() {
    const orders = useLoaderData() as Orders[];
    console.log(orders)
    
    return (
        <div className="order-details">
            <Table isHeaderSticky aria-label="Orders"  className="table-container">
                <TableHeader>
                    <TableColumn>TABLE</TableColumn>
                    <TableColumn>CLIENT</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody className="table-body">
                    {orders.map((order) => (
                        <TableRow key={order.userId}>
                            <TableCell>{order.table}</TableCell>
                            <TableCell>{order.client}</TableCell>
                            <TableCell>
                                <Chip className="capitalize" color="warning" size="sm" variant="flat">
                                    {order.status}
                                </Chip>
                            </TableCell>
                            <TableCell>
                                <div className="relative flex items-center justify-center gap-2">
                                    <Tooltip content="Details">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <EyeIcon />
                                        </span>
                                    </Tooltip>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export { MyOrders };