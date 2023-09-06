import { Input, Radio, RadioGroup, Button } from "@nextui-org/react";
import { MailIcon } from "./MailIcon";

function RegisterUser (): JSX.Element {
    return (
        <div className="form-register-user">
            <h1>Create User</h1>
            <div className="w-full flex flex-col gap-4">
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
                    labelPlacement="outside" 
                    variant="bordered" 
                    label="Password" 
                    placeholder="Enter your password" />
                </div>

                <RadioGroup label="Role" orientation="horizontal">
                    <div className="flex justify-center gap-4">
                        <Radio value="waiter">Waiter</Radio>
                        <Radio value="chef">Chef</Radio>
                        <Radio value="admin">Admin</Radio>
                    </div>
                </RadioGroup>

                <div className="button-save-cancel flex justify-center gap-4">
                    <Button color="success" className="text-white text-xl">Save</Button>
                    <Button color="default" variant="light" style={{ color: '#9CA3AF' }} className="text-xl">Cancel</Button>
                </div>
            </div>
        </div>
    );
}

export { RegisterUser };