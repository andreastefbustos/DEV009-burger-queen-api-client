import { Form, redirect } from "react-router-dom";
import { Input, Button } from "@nextui-org/react";
import { LoginLayout } from "./LoginLayout";
import './index.css';

async function loginUser(email: string, password: string): Promise<Response> {
    return fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email: email, password: password})
    })
}

async function LoginAction({ request }: { request: Request }) {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password =  formData.get("password") as string;
    const response = await loginUser(email, password);
    if (response.status !== 200) {
        return redirect("/error")
    }
    const data = await response.json();

    // save token and user in local storage
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));

    switch (data.user.role) {
        case "admin":
            return redirect("/dashboard");
        case "waiter":
            return redirect("/tables");
        case "chef":
            return redirect("/orders");
        default:
            return redirect("/error");
    }
}

function Login(): JSX.Element {
    return (
    <LoginLayout>
        <div className="login-container">
        <h1 className="title-login">Burgen<br /> Queen</h1>
        <div className="form-container flex flex-col gap-4">
            <Form className="w flex flex-col gap-4" method="POST" id="login">
                <Input
                isRequired
                type="email"
                name="email"
                label="Email"
                placeholder="Enter your email"
                className="max-w-xs"
                />

                <Input
                isRequired
                type="password"
                name="password"
                label="Password"
                placeholder="Enter your password"
                className="max-w-xs "
                />
                <Button type="submit" className="button-submit-login font-bold">Sing in</Button>
            </Form>
        </div>
        </div>
    </LoginLayout> 
    )
}

export { Login, LoginAction };