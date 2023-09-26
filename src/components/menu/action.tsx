import { ActionFunctionArgs, redirect } from "react-router-dom";
import { createOrder, updateOrder } from "../../services/orders";
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

async function updateWaiterOrderAction({request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const orderId = formData.get("id") as string;

  const response = await updateOrder(orderId, "delivered");

  if(checkUnauthorize(response)) {
    return redirect("/")
  }

  if(response.status != 200) {
    return redirect("/error");
  }

  return true;
}

export { orderAction, updateWaiterOrderAction };

