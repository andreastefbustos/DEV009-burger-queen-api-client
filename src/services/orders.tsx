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

async function createOrder(client: string, clientTable: string, products: ProductCart[]) {
    const user = localStorage.getItem("user");
    if(!user) {
        throw new Error("Require login")
    }

    const u = JSON.parse(user);

    return fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
            client: client, 
            table: clientTable,
            products: products, 
            userId: u.id, 
            status: "pending", 
            dataEntry: getCurrentDateTime()
        })
    })
}

async function getOrders() {
    return fetch("http://localhost:8080/orders", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
}
export { createOrder, getOrders };