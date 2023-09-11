async function loginUser(email: string, password: string): Promise<Response> {
    return fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email: email, password: password})
    })
}

async function getUsers() {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8080/users", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    const data = await response.json();
    return data;
}

async function getUser(id: string): Promise<Response> {
    return fetch(`http://localhost:8080/users/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("token")}`
        },
    })
}

async function createUser(email: string, password: string, role: string): Promise<Response> {
    return fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email: email, password: password, role: role})
    })
}

async function updateUser(id: string, password: string, role: string): Promise<Response> {
    const token = localStorage.getItem("token");
    return fetch(`http://localhost:8080/users/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
        body: JSON.stringify({password, role}, (_key, value) => {
            if (value === "" || value === null || value === undefined) return undefined;
            return value;
        })
    })
}

async function deleteUser(id: string): Promise<Response> {
    const token = localStorage.getItem("token");
    return fetch(`http://localhost:8080/users/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
    })
}

async function getProducts() {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8080/products", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    const data = await response.json();
    return data;
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
    const token = localStorage.getItem("token");
    return fetch(`http://localhost:8080/products/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
        body: JSON.stringify({name, price, image, type}, (_key, value) => {
            if (value === "" || value === null || value === undefined) return undefined;
            return value;
        })
    })
}

function getCurrentDateTime() {
    const now = new Date();

    // "2022-03-05T15:14:10.123Z" -> Separar en fecha y hora
    const [datePart, timePart] = now.toISOString().split('T');

    // Tomar solo las horas, minutos y segundos de la parte del tiempo
    const time = timePart.slice(0, 8);

    return `${datePart} ${time}`;
}

async function deleteProduct(id: string): Promise<Response> {
    const token = localStorage.getItem("token");
    return fetch(`http://localhost:8080/products/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
    })
}



export { 
    loginUser, 
    getUsers, 
    getUser, 
    createUser, 
    updateUser, 
    deleteUser, 
    getProducts, 
    getProduct, 
    createProduct,
    updateProduct,
    deleteProduct
}
