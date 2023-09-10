import { redirect, Params } from "react-router-dom";

// Funciones para crear un nuevo usuario
async function createUser(email: string, password: string, role: string): Promise<Response> {
    return fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email: email, password: password, role: role})
    })
}

export async function createUserAction({ request }: { request: Request }) {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password =  formData.get("password") as string;
    const role =  formData.get("role") as string;
    const response = await createUser(email, password, role);
    if (response.status !== 201) {
        return redirect("/error")
    }
    
    return redirect("/dashboard");
}

// Funciones para iditar un usuario
async function updateUser(id: string, password: string, role: string): Promise<Response> {
    const token = localStorage.getItem("token");
    return fetch(`http://localhost:8080/users/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
        body: JSON.stringify({password: password, role: role})
    })
}

export async function updateUserAction({params, request}: {params: Params<string>, request: Request}) {
    const formData = await request.formData();
    const userId = params.id!;
    const password =  formData.get("password") as string;
    const role =  formData.get("role") as string;
    const response = await updateUser(userId, password, role);
    if (response.status !== 200) {
        return redirect("/error")
    }
    return redirect("/dashboard");
}

