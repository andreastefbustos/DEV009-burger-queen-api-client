import { 
  Button,
    Card, 
    CardBody, 
    CardFooter, 
    Image } 
from "@nextui-org/react";
import { FaClipboardList } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import './index.css'

type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    type: string;
    dateEntry: string;
};

export function Menu(): JSX.Element {
    const products = useLoaderData() as Product[];
 
    return (
        <div className="container_cards">
            <div className="cards">
      {products.map((item, index) => (
        <Card style={{ width: '200px', height: '320px' }} shadow="sm" key={index}>
          <CardBody className="overflow-visible p-0">

            <Image style={{height: '180px'}}
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.name}
              className="image_card w-full object-cover h-[140px] "
              src={item.image}
            />
      
           
          </CardBody>
          <CardFooter className="text-medium justify-between">
            <b>{item.name}</b>
            <p className="text-default-500">${item.price}</p>
          </CardFooter>
          <Button className="button_add_order" startContent={<FaClipboardList/>}>
        Add to order
      </Button> 
        </Card>
      ))}
    </div>
        </div>
        
        
    );
}