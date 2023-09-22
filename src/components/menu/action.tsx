import { ActionFunctionArgs, redirect } from "react-router-dom";
import { createOrder } from "../../services/orders";
import { checkUnauthorize } from "../../services/token";

async function orderAction({request}: ActionFunctionArgs) {
    const formData = await request.formData();
    const clientName = formData.get("client") as string;
    const clientTable = formData.get("clientTable") as string;
    const productsStr = formData.get("products") as string;
    if (!productsStr) {
        throw new Error("Products are missing");
    }

    const products = JSON.parse(productsStr);
    const resp = await createOrder(clientName, clientTable, products)
    if (checkUnauthorize(resp)) {
        return redirect("/")
    }

    if (resp.status !== 201) {
        return redirect("/error")
    }

    localStorage.removeItem("shopCart")

    return {orderCreated: true}
}

export { orderAction };

