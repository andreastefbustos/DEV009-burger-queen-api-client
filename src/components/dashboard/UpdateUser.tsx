import { Input, Radio, RadioGroup, Button, User } from "@nextui-org/react";
import { MailIcon } from "./MailIcon";
import { Form, useLoaderData, Link } from "react-router-dom";

type User = {
    email: string;
    password: string;
    role: string;
};

function UpdateUser (): JSX.Element {
    const user = useLoaderData() as User;

    return (
        <div className="form-register-user">
            <h1>Update User</h1>
            <Form className="w-full flex flex-col gap-4" method="POST" id="register">
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input 
                    type="email"
                    name="email"
                    labelPlacement="outside" 
                    variant="bordered" 
                    label="Email address"
                    defaultValue={user.email}
                    disabled
                    startContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }/>

                    <Input 
                    type="password" 
                    name="password"
                    labelPlacement="outside" 
                    variant="bordered" 
                    label="Password" 
                    defaultValue={user.password}
                    placeholder="Enter new password" />
                </div>

                <RadioGroup label="Role" orientation="horizontal" name="role" defaultValue={user.role}>
                    <div className="flex justify-center gap-4">
                        <Radio value="waiter">Waiter</Radio>
                        <Radio value="chef">Chef</Radio>
                        <Radio value="admin">Admin</Radio>
                    </div>
                </RadioGroup>

                <div className="button-save-cancel flex justify-center gap-4">
                    <Button color="success" className="text-white text-xl" type="submit">Save</Button>
                    <Button color="default" variant="light" style={{ color: '#9CA3AF' }} className="text-xl">
                        <Link to={"/dashboard"}>Cancel</Link>
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export { UpdateUser };