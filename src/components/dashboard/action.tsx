import { redirect } from "react-router-dom";
import { checkUnauthorize } from "../../services/token";
import { deleteUser } from "../../services/users";
import { deleteProduct } from "../../services/products" 

export async function dashboardAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const intent = formData.get("intent")
  let resp;
  if (intent === "product-delete") {
    const id = formData.get("id");
    resp = await deleteProduct(id as string);
  } else if (intent === "user-delete") {
    const userId = formData.get("id");
    resp = await deleteUser(userId as string);
  } else {
    return redirect("/error")
  }

  if (checkUnauthorize(resp)) {
    return redirect("/")
  }

  if (resp.status !== 200) {
    return redirect("/error")
  }

  return {ok: true}
}
