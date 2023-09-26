import { ActionFunctionArgs, redirect } from "react-router-dom";
import { updateOrder } from "../../services/orders";
import { checkUnauthorize } from "../../services/token";

export async function updateOrderAction ({request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const orderId = formData.get("id") as string;

  const response = await updateOrder(orderId, "ready")

  if (checkUnauthorize(response)) {
    return redirect("/")
  }

  if (response.status !== 200) {
    return redirect("/error")
  }
  return redirect("/kitchen");
}