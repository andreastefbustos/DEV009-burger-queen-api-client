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

function updateUser(id: string, password: string, role: string): Promise<Response> {
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

export { loginUser, getUsers, getUser, createUser, updateUser, deleteUser}
