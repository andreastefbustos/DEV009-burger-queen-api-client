import { 
  Button,
  Card, 
  CardBody, 
  CardFooter, 
  Image,
  Tabs,
  Tab } 
from "@nextui-org/react";
import { FaClipboardList, FaPlusCircle } from "react-icons/fa";
import { useLoaderData, useSubmit } from "react-router-dom";
import './index.css'
import { useMemo, useState } from "react";
import { ModalButtonOrder } from "./ModalButtonMenu";
import { BsDashCircleFill } from "react-icons/bs";
import { Cart, Product, ProductCart } from "../../types/product";

export function Menu(): JSX.Element {
  const products = useLoaderData() as Product[];
  const [activeTab, setActiveTab] = useState("desayunos"); // Establece un Tab inicial
  const saveShop = localStorage.getItem('shopCart')
  const saveShopCart = saveShop ? JSON.parse(saveShop) : null
  const [shopCart, setShopCart] = useState(saveShopCart || {products: []} as Cart);
  const submit = useSubmit();

  const sendOrder = (client: string, clientTable: string, products: ProductCart[]) => {
    setShopCart({ products: []});
    submit({
      products: JSON.stringify(products),
      client: client,
      clientTable: clientTable
    }, {method: "POST", action: "/menu"})
  };
  
  const addToCart = (product: Product) => {
    // Creamos una copia profunda de shopCart
    const updatedShopCart = { ...shopCart, products: [...shopCart.products] };
  
    // Buscamos si el producto ya está en el carrito
    const foundProduct = updatedShopCart.products.find((productCard: ProductCart) => productCard.product.id === product.id);
  
    if (foundProduct) {
      // Si el producto ya está en el carrito, incrementamos la cantidad
      foundProduct.qty += 1;
    } else {
      // Si no, agregamos el nuevo producto al carrito
      const newProductCard: ProductCart = {
        qty: 1,
        product: product
      };
      updatedShopCart.products.push(newProductCard);
    }
  
    setShopCart(updatedShopCart);
  
    // Guardar en localStorage
    localStorage.setItem('shopCart', JSON.stringify(updatedShopCart));
  }

  const modifyQty = (type: string, product:Product) => {
    const updatedShopCart = { ...shopCart, products: [...shopCart.products] };
    const foundProduct = updatedShopCart.products.find((productCard: ProductCart) => productCard.product.id === product.id);
    if (!foundProduct) {
      return
    }

    if (type === "increment") {
       foundProduct.qty += 1;
    }else if (type === "decrement") {
      foundProduct.qty -= 1;
      if(foundProduct.qty <= 0) {
        return deleteFromCart(product)
      }
    }

    setShopCart(updatedShopCart);
    // Guardar en localStorage
    localStorage.setItem('shopCart', JSON.stringify(updatedShopCart));
  }

  const deleteFromCart = (product: Product) => {
    const filteredProducts = shopCart.products.filter((p: ProductCart) => { return p.product.id != product.id });
    const updatedShopCart = {
      ...shopCart,
      products: filteredProducts
    };

    setShopCart(updatedShopCart);
    localStorage.setItem('shopCart', JSON.stringify(updatedShopCart));
  }

  // Verificación si el producto ya esta en el carro
  const isProductInCart = (product: Product): boolean => {
    const foundProductInCart = shopCart.products.find((productCard: ProductCart) => productCard.product.id === product.id )
    return !!foundProductInCart;
  }


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
      <Tabs style={{position: "fixed", zIndex: "1000"}} key="menu" size="lg" aria-label="Tabs menus" onSelectionChange={(key) => setActiveTab(key.toString())}>
          <Tab key="desayunos" title="Desayunos" />
          <Tab key="almuerzosCenas" title="Almuerzos y Cenas" />
          <Tab key="bebidas" title="Bebidas" />
      </Tabs>
      </div>
      <div className="container-cards">
      <div className="cards">
        {filteredProducts.map((item) => (
          <Card style={{ width: '200px', height: '320px' }} shadow="sm" key={item.id}>
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
            {isProductInCart(item) ? 
              (
                <div className="sum-less-menu">
                  <BsDashCircleFill onClick={() => {modifyQty("decrement", item)}} style={{ color: '#9CA3AF' }}/>
                    <span>{shopCart.products.find((productCart: ProductCart) => productCart.product.id === item.id)?.qty || 0}</span>
                  <FaPlusCircle onClick={() => {modifyQty("increment", item)}} style={{ color: '#9CA3AF' }}/>
                </div>
              ) : 
              (
                <Button onClick={() => {addToCart(item)}} className="button_add_order" startContent={<FaClipboardList/>}>
                  Add to order
                </Button>
              )}
          </Card>
        ))}
      </div>
    </div>
    <ModalButtonOrder cart={shopCart} handleDelete={deleteFromCart} handleQty={modifyQty} sendOrder={sendOrder} />
    </div>  
  );
}