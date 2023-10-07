import { redirect } from "react-router-dom";
import { getOrders } from "../../services/orders";
import { checkUnauthorize } from "../../services/token";

async function ordersKitchenLoader() {
  const token = localStorage.getItem("token");
  if(!token) {
    return redirect("/");
  }

  const user = JSON.parse(localStorage.getItem("user") as string);
  if(user.role !== "chef"){
    return redirect("/error");
  }

  const resp: Response = await getOrders();

  if (checkUnauthorize(resp)) {
    return redirect("/")
  }

  if(resp.status != 200) {
    return redirect('/error');
  }

  return resp.json()
}

export { ordersKitchenLoader };