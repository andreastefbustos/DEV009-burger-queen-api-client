import { checkUnauthorize } from "../../services/token";
import { loginUser } from "../../services/users";
import { redirect } from "react-router-dom";

export async function loginAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password =  formData.get("password") as string;
  const response = await loginUser(email, password);

  if (checkUnauthorize(response)) {
    return redirect("/")
  }
  
  if (response.status !== 200) {
    return {error: true, message: "Invalid credential*"}
  }
  const data = await response.json();

  // save token and user in local storage
  localStorage.setItem("token", data.accessToken);
  localStorage.setItem("user", JSON.stringify(data.user));
  // const objPermissions: {[key: string]: {defaultRoute: string, permissions: string[]}} = {
  //   admin: {
  //     defaultRoute: "dashboard",
  //     permissions: []
  //   },
  //   waiter: {
  //     defaultRoute: "menu",
  //     permissions: []
  //   },
  //   chef: {
  //     defaultRoute: "kitchen",
  //     permissions: []
  //   },
  // };
  // return redirect("/" + objPermissions[data.user.role].defaultRoute);
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