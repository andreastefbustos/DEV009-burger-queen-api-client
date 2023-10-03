import { loginUser } from "../../services/users";
import { redirect } from "react-router-dom";
import { getFormData } from "../../utilities/utils";


export async function loginAction({ request }: { request: Request }) {
  const user = await getFormData(request);
  const email = user.email as string;
  const password =  user.password as string;
  const response = await loginUser(email, password);
  
  if (response.status !== 200) {
    return {error: true, message: "Invalid credential*"}
  }
  const data = await response.json();

  // save token and user in local storage
  localStorage.setItem("token", data.accessToken);
  localStorage.setItem("user", JSON.stringify(data.user));

  switch (data.user.role) {
    case "admin":
      return redirect("/dashboard");
    case "waiter":
      return redirect("/menu");
    case "chef":
      return redirect("/kitchen");
    default:
      return redirect("/error");
  }
}