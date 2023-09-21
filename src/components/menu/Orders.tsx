import { 
    Table, 
    TableHeader, 
    TableColumn, 
    TableBody, 
    TableRow, 
    TableCell} from "@nextui-org/react";
import { useLoaderData } from "react-router-dom";

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
                    <TableColumn>DETAILS</TableColumn>
                </TableHeader>
                <TableBody className="table-body">
                    {orders.map((order) => (
                        <TableRow key={order.userId}>
                            <TableCell>{order.table}</TableCell>
                            <TableCell>{order.client}</TableCell>
                            <TableCell>{order.status}</TableCell>
                            <TableCell>{order.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export { MyOrders };