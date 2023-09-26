import { getCurrentDateTime } from "../utilities/getCurrentDateTime";
import { ProductCart } from "../types/product";

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

async function updateOrder(id: string, status: string) {
  return fetch(`http://localhost:8080/orders/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({status: status, dateProcessed: getCurrentDateTime()})
  })
}

export { createOrder, getOrders, updateOrder };