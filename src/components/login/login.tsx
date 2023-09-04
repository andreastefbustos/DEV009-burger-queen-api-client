import { Form } from "react-router-dom";
import { Input, Button } from "@nextui-org/react";
import './index.css';

function Login() {
    return (
        <div className="login-container flex flex-col items-start ml-4">
        <h1 className="title-login">Burgen<br /> Queen</h1>

        
        <div className="form-container flex flex-col gap-4">
            <Form className="w flex flex-col gap-4" method="POST" id="login">
                <Input
                isRequired
                type="email"
                label="Email"
                placeholder="Enter your email"
                className="max-w-xs"
                />

                <Input
                isRequired
                type="password"
                label="Password"
                placeholder="Enter your password"
                className="max-w-xs "
                />
                <Button type="submit" className="button-submit-login font-bold">Sing in</Button>
            </Form>
        </div>
        </div>
    )
}

export { Login };