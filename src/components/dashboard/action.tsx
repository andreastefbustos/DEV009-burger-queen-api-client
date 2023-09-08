import { redirect } from "react-router-dom";

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