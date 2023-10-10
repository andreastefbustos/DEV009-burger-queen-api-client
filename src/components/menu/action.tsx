import { ActionFunctionArgs, redirect } from "react-router-dom";
import { createOrder, updateOrder } from "../../services/orders";
import { checkUnauthorize } from "../../services/token";
import { getFormData } from "../../utilities/utils";

async function orderAction({request}: ActionFunctionArgs) {
  const formData = await getFormData(request);
  const clientName = formData.client as string;
  const clientTable = formData.clientTable as string;
  const productsStr = formData.products as string;
  if (!productsStr) {
    throw new Error("Products are missing");
  }

  const products = JSON.parse(productsStr);
  console.log("VOY a crear la orden")
  const resp = await createOrder(clientName, clientTable, products)
  console.log("ENTRO 2", resp)
  if (checkUnauthorize(resp)) {
    return redirect("/")
  }
  console.log("ENTRO 3", resp)
  if (resp.status !== 201) {
    return redirect("/error")
  }

  localStorage.removeItem("shopCart")

  return {orderCreated: true}
}

async function updateWaiterOrderAction({request}: ActionFunctionArgs) {
  const formData = await getFormData(request);
  const orderId = formData.id as string;

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

