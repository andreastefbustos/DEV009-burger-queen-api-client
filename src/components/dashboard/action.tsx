import { redirect } from "react-router-dom";
import { deleteUser, deleteProduct } from "../../api";

export async function dashboardAction({ request }: { request: Request }) {
    const formData = await request.formData();
    const intent = formData.get("intent")
    if (intent === "product-delete") {
        const id = formData.get("id");
        const resp = await deleteProduct(id as string);
        if (resp.status !== 200) {
            return redirect("/error")
        }
        return {ok: true}
    }

    if (intent === "user-delete") {
        const userId = formData.get("id");
        const resp = await deleteUser(userId as string);
        if (resp.status != 200) {
            return redirect("/error")
        }
        return {ok: true}
    }

}
