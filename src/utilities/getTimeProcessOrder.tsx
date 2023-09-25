import { getCurrentDateTime } from "../utilities/getCurrentDateTime";

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

export function getTimeProcessOrder(order: Order) {
    const lastTime = new Date(order.dataEntry + 'Z');
    let currentTime;
    if (order.dateProcessed) {
        currentTime = new Date(order.dateProcessed + 'Z');
    } else {
        currentTime = new Date(getCurrentDateTime() + "Z")
    }

    // Calcular la diferencia en milisegundos
    const diferenciaMilisegundos = currentTime.getTime()  - lastTime.getTime();

    // Convertir la diferencia a minutos
    const diferenciaMinutos = Math.floor(diferenciaMilisegundos / 1000 / 60);
    if (diferenciaMinutos > 60) {
        const hours = Math.floor(diferenciaMinutos / 60);
        return hours + 'h';
    } else {
        return diferenciaMinutos + "m";
    }
}