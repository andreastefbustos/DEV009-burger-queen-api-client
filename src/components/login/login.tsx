import { Form, useActionData } from "react-router-dom";
import { Input, Button } from "@nextui-org/react";
import { LoginLayout } from "./LoginLayout";
import './index.css';

type ActionData = {
  error?: string;
  message: string;
};

function Login(): JSX.Element {
  const actionData = useActionData() as ActionData;

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
            <Button type="submit" className="button-submit-login font-bold">Sign in</Button>
          </Form>
          {actionData && actionData.error && <p className="alert alert-danger">{actionData.message}</p>}
        </div>
      </div>
    </LoginLayout> 
  )
}

export { Login };