import { checkUnauthorize } from "../../services/token";
import { getUsers, getUser } from "../../services/users";
import { getProducts, getProduct } from "../../services/products";
import { LoaderFunctionArgs, redirect } from "react-router-dom";

export async function dashboardLoader({request}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const tab = url.searchParams.get("tab");
    const token = localStorage.getItem("token");
    if (!token) {
        return redirect("/login")
    }

    const user = JSON.parse(localStorage.getItem("user") as string);
    if (user.role !== "admin") {
        return redirect("/error")
    }

    const respUsers = await getUsers();
    const respProducts = await getProducts();


    if (checkUnauthorize(respUsers) || checkUnauthorize(respProducts)) {
        return redirect("/")
    }

    return { users: await respUsers.json(), products: await respProducts.json(), tab: tab}
}

// Se obtiene solo un usuario por medio de su ID
export async function loaderUser ({params}: LoaderFunctionArgs): Promise<Response> {
    const resp: Response = await getUser(params.id as string);
    if(resp.status != 200) {
        return redirect('/error');
    }
    
    return resp
}

export async function loaderProduct ({params}: LoaderFunctionArgs): Promise<Response> {
    const resp: Response = await getProduct(params.id as string);
    if(resp.status != 200) {
        return redirect('/error');
    }
    
    return resp
}