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
import { useLoaderData, useNavigate } from "react-router-dom";
import { EyeIcon } from "../../assets/EyeIcon";
import { DetailOrder } from "./DetailOrder";
import { useCallback, useEffect, useState } from "react";
import { getTimeProcessOrder } from "../../utilities/getTimeProcessOrder"
import { BiTimer } from "react-icons/bi";
import { Order } from "../../types/order";
import { getOrders } from "../../services/orders";

function KitchenOrders() {
    const [orders, setOrders] = useState<Order[]>(useLoaderData() as Order[]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const navigate = useNavigate();

    const order = orders.filter((order: Order) => {
      return order.status != "delivered"  
    })

    const fetchOrders = useCallback(async () => {
      const resp = await getOrders();
      // TODO: Handler errors.
      if (resp.status != 200) {
        navigate("/error")
      }
  
      // TODO: Compare the newOrders with the old orders.
      const newOrders = await resp.json()
      setOrders(newOrders);
    }, [navigate]);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        fetchOrders(); // Hacer una solicitud cada 60 segundos
      }, 60000);
  
      return () => {
        clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonta
      };
    }, [fetchOrders]);

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
            <TableColumn>RECEIVED</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>READY ORDER</TableColumn>
            <TableColumn 
            style={{display: "flex", alignItems: "center"}}>
              <BiTimer style={{fontSize: "30px"}}/>
              TIME
            </TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody className="table-body">
            {order.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.table}</TableCell>
                <TableCell>{order.dataEntry}</TableCell>
                <TableCell>
                  <Chip className="capitalize" color={statusColorMap[order.status]} size="sm" variant="flat">
                      {order.status}
                  </Chip>
                </TableCell>
                <TableCell>{order.dateProcessed}</TableCell>
                <TableCell>{getTimeProcessOrder(order)}</TableCell>
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