import { checkUnauthorize } from "../../services/token";
import { getUsers } from "../../services/users";
import { getProducts } from "../../services/products";
import { redirect } from "react-router-dom";
import { getOrders } from "../../services/orders";

async function productsLoader() {
    const token = localStorage.getItem("token");
    if (!token) {
        return redirect("/login")
    }

    const user = JSON.parse(localStorage.getItem("user") as string);
    if (user.role !== "waiter") {
        return redirect("/error")
    }

    const respUsers = await getUsers();
    const respProducts = await getProducts();


    if (checkUnauthorize(respUsers) || checkUnauthorize(respProducts)) {
        return redirect("/")
    }

    return respProducts.json();
}

async function ordersLoader() {
    const resp: Response = await getOrders();
    if(resp.status != 200) {
        return redirect('/error');
    }
    
    return resp
}

export { productsLoader, ordersLoader };