import { checkUnauthorize } from "../../../services/token";
import { createUser, updateUser } from "../../../services/users";
import { redirect, Params } from "react-router-dom";
import { getFormData } from "../../../utilities/utils";

export async function createUserAction({ request }: { request: Request }) {
    const formData = await getFormData(request);
    const email = formData.email as string;
    const password =  formData.password as string;
    const role =  formData.role as string;
    const response = await createUser(email, password, role);

    if (checkUnauthorize(response)) {
        return redirect("/")
    }

    if (response.status !== 201) {
        return redirect("/error")
    }
    
    return redirect("/dashboard");
}

export async function updateUserAction({params, request}: {params: Params<string>, request: Request}) {
    const formData = await getFormData(request);
    const userId = params.id!;
    const password =  formData.password as string;
    const role =  formData.role as string;
    const response = await updateUser(userId, password, role);
    console.log("se ejecuta esto?")
    if (checkUnauthorize(response)) {
        return redirect("/")
    }

    if (response.status !== 200) {
        return redirect("/error")
    }
    
    return redirect("/dashboard");
}