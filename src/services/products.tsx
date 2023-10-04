import { getCurrentDateTime } from "../utilities/getCurrentDateTime"

async function getProducts() {
  return fetch("http://localhost:8080/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${localStorage.getItem("token")}`
    }
  })
}

async function getProduct(id: string): Promise<Response> {
  return fetch(`http://localhost:8080/products/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${localStorage.getItem("token")}`
    },
  })
}

async function createProduct(name: string, price: number, image: string, type: string): Promise<Response> {
  return fetch("http://localhost:8080/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({name: name, price: price, image: image, type: type, dateEntry: getCurrentDateTime()})
  })
}

async function updateProduct(id: string, name: string, price: number, image: string, type: string): Promise<Response> {
  return fetch(`http://localhost:8080/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({name, price, image, type}, (_key, value) => {
      if (value === "" || value === null || value === undefined) return undefined;
      return value;
    })
  })
}

async function deleteProduct(id: string): Promise<Response> {
  return fetch(`http://localhost:8080/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${localStorage.getItem("token")}`
    },
  })
}

export { 
  getProducts, 
  getProduct, 
  createProduct,
  updateProduct,
  deleteProduct
}