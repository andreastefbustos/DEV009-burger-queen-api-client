import { Input, Radio, RadioGroup, Button, Image } from "@nextui-org/react";
import { Form, useLoaderData, Link } from "react-router-dom";
import { Product } from "../../../types/product";

function UpdateProduct (): JSX.Element {
    const product = useLoaderData() as Product;

    return (
        <div>
            <div className="form">
                <h1>Update Product</h1>
                <Form className="w-full flex flex-col gap-4" method="POST" id="register">
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input 
                        type="name"
                        name="name"
                        labelPlacement="outside" 
                        variant="bordered" 
                        label="Name"
                        defaultValue={product.name} 
                        placeholder="Enter product name" 
                        />

                        <Input
                        type="number"
                        name="price"
                        label="Price"
                        defaultValue={product.price.toString()} 
                        placeholder="0.00"
                        labelPlacement="outside"
                        startContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">$</span>
                            </div>
                        }
                        />

                        <Input
                        type="url"
                        name="image"
                        label="Image"
                        defaultValue={product.image}
                        placeholder="gitHub/images"
                        labelPlacement="outside"
                        startContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-400 text-small">https://</span>
                            </div>
                        }
                        />
                    </div>
                    <Image isZoomed src={product.image} alt="products_img" width={240} className="m-5"/>

                    <RadioGroup label="Type" orientation="horizontal" name="type" defaultValue={product.type}>
                        <div className="flex justify-center gap-4">
                            <Radio value="desayuno">Desayuno</Radio>
                            <Radio value="almuerzo_cena">Almuerzo y Cena</Radio>
                            <Radio value="bebida">Bebida</Radio>
                        </div>
                    </RadioGroup>

                    <div className="button-save-cancel flex justify-center gap-4">
                        <Button color="success" className="text-white text-xl" type="submit">Save</Button>
                        <Button color="default" variant="light" style={{ color: '#9CA3AF' }} className="text-xl">
                            <Link to={"/dashboard?tab=products"}>Cancel</Link>
                        </Button>
                    </div>
                </Form>
            </div>
        </div>  
    );
}

export { UpdateProduct };