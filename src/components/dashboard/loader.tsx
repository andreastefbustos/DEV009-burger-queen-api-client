import { getUsers, getUser, getProducts } from "../../api";
import { LoaderFunctionArgs, redirect } from "react-router-dom";

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
    const products = await getProducts();

    return { users:users, products: products}
}

// Se obtiene solo un usuario por medio de su ID
export async function loaderUser ({params}: LoaderFunctionArgs): Promise<Response> {
    const resp: Response = await getUser(params.id as string);
    if(resp.status != 200) {
        return redirect('/error');
    }
    
    return resp
}