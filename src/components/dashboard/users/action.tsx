import { createUser, updateUser } from "../../../api";
import { redirect, Params } from "react-router-dom";

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