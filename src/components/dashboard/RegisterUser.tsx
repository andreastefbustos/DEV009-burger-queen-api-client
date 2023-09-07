import { Input, Radio, RadioGroup, Button } from "@nextui-org/react";
import { MailIcon } from "./MailIcon";
import { Form, redirect, useNavigate } from "react-router-dom";

async function createUser(email: string, password: string, role: string): Promise<Response> {
    return fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email: email, password: password, role: role})
    })
}

async function CreateUserAction({ request }: { request: Request }) {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password =  formData.get("password") as string;
    const role =  formData.get("role") as string;
    const response = await createUser(email, password, role);
    if (response.status !== 201) {
        return redirect("/error")
    }
    
    return redirect("/dashboard");

}

function RegisterUser (): JSX.Element {
    const navigate = useNavigate();
    
    const cancelHandler = () => {
        navigate('/dashboard');
    };

    return (
        <div className="form-register-user">
            <h1>Create User</h1>
            <Form className="w-full flex flex-col gap-4" method="POST" id="register">
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input 
                    type="name" 
                    labelPlacement="outside" 
                    variant="bordered" 
                    label="First Name" 
                    placeholder="Enter your first name" />
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input 
                    type="name" 
                    labelPlacement="outside" 
                    variant="bordered" 
                    label="Last Name" 
                    placeholder="Enter your last name" />
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input 
                    type="email"
                    name="email"
                    labelPlacement="outside" 
                    variant="bordered" 
                    label="Email address" 
                    placeholder="Enter your email" 
                    startContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }/>
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input 
                    type="password" 
                    name="password"
                    labelPlacement="outside" 
                    variant="bordered" 
                    label="Password" 
                    placeholder="Enter your password" />
                </div>

                <RadioGroup label="Role" orientation="horizontal" name="role">
                    <div className="flex justify-center gap-4">
                        <Radio value="waiter">Waiter</Radio>
                        <Radio value="chef">Chef</Radio>
                        <Radio value="admin">Admin</Radio>
                    </div>
                </RadioGroup>

                <div className="button-save-cancel flex justify-center gap-4">
                    <Button color="success" className="text-white text-xl" type="submit">Save</Button>
                    <Button color="default" variant="light" style={{ color: '#9CA3AF' }} className="text-xl" onClick={cancelHandler}>Cancel</Button>
                </div>
            </Form>
        </div>
    );
}

export { RegisterUser, CreateUserAction };