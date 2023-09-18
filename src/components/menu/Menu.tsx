import { 
  Button,
  Card, 
  CardBody, 
  CardFooter, 
  Image,
  Tabs,
  Tab } 
from "@nextui-org/react";
import { FaClipboardList } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import './index.css'
import { useMemo, useState } from "react";

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
  const [activeTab, setActiveTab] = useState("desayunos"); // Establece un Tab inicial

  const filteredProducts = useMemo(() => {
    switch (activeTab) {
      case "desayunos":
        return products.filter(p => p.type === "desayuno");
      case "almuerzosCenas":
        return products.filter(p => p.type === "almuerzo_cena");
      case "bebidas":
        return products.filter(p => p.type === "bebida");
      default:
        return products;
    }
  }, [products, activeTab]);
  
  return (
    <div>
      <div className="container-tabs">
      <Tabs key="menu" size="lg" aria-label="Tabs menus" onSelectionChange={(key) => setActiveTab(key.toString())}>
          <Tab key="desayunos" title="Desayunos" />
          <Tab key="almuerzosCenas" title="Almuerzos y Cenas" />
          <Tab key="bebidas" title="Bebidas" />
      </Tabs>
      </div>
      <div className="container-cards">
      <div className="cards">
        {filteredProducts.map((item, index) => (
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
            <CardFooter className="footer-title text-medium justify-between">
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
    </div>  
  );
}