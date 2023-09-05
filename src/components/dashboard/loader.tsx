import { redirect } from "react-router-dom";

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