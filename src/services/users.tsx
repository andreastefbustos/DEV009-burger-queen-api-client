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
    return await fetch("http://localhost:8080/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
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
    return fetch(`http://localhost:8080/users/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({password, role}, (_key, value) => {
            if (value === "" || value === null || value === undefined) return undefined;
            return value;
        })
    })
}

async function deleteUser(id: string): Promise<Response> {
    return fetch(`http://localhost:8080/users/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("token")}`
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
}
