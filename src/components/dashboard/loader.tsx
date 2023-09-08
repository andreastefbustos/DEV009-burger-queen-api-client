import { LoaderFunctionArgs, redirect } from "react-router-dom";

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

export async function dashboardLoader() {
    const token = localStorage.getItem("token");
    if (!token) {
        return redirect("/login")
    }

    const user = JSON.parse(localStorage.getItem("user") as string);
    if (user.role !== "admin") {
        return redirect("/error")
    }

    const users = await getUsers();

    return users
}

// Se obtiene solo un usuario por medio de su ID
async function getUser(id: string): Promise<Response> {
    return fetch(`http://localhost:8080/users/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("token")}`
        },
    })
}

export async function loaderUser ({params}: LoaderFunctionArgs): Promise<Response> {
    const resp: Response = await getUser(params.id as string);
    if(resp.status != 200) {
        return redirect('/error');
    }
    
    return resp
}