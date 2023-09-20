import { 
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Button, 
    useDisclosure,
    Input
} from "@nextui-org/react";
import { FaShoppingCart, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import { BsDashCircleFill } from "react-icons/bs";
import { Form } from "react-router-dom";

type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    type: string;
    dateEntry: string;
};
  
type ProductCart = {
    qty: number;
    product: Product
}

interface CartProps {
    cart: {
        products: ProductCart[];
    };
    handleDelete: (product: Product) => void;
    handleQty: (type:string, product: Product) => void;

}

function ModalButtonOrder({cart, handleDelete, handleQty}: CartProps ) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div className="flex flex-col gap-2">
      <Button onPress={onOpen} className="button-order">
        <FaShoppingCart />
      </Button>
  
      <Modal 
        isOpen={isOpen} 
        placement="bottom"
        onOpenChange={onOpenChange} 
        scrollBehavior="inside"
        className="modal-order"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Order</ModalHeader>
              <ModalBody>
                <Form className="w-full flex flex-col gap-4" method="POST" id="order">
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                        type="name"
                        name="email"
                        label="Client's Name"
                        />

                        <Input
                        type="name"
                        name="table"
                        label="N* table"
                        />
                    </div>
                </Form>
               
                {cart.products.map((product: ProductCart, index: number) => (
                    <div key={index} className="item-order" id={`item-${product.product.id}`}>
                        <img 
                        src={product.product.image}
                        alt={product.product.name} 
                        className="img-item-menu"/>
                        <div className="name-qty-item-menu">
                            {product.product.name}
                            <div className="sum-less">
                                <FaPlusCircle onClick={() => {handleQty("increment", product.product)}} style={{ color: '#9CA3AF' }}/>
                                    {product.qty}
                                <BsDashCircleFill onClick={() => {handleQty("decrement", product.product)}} style={{ color: '#9CA3AF' }}/>
                            </div>
                        </div>
                        <div className="trash-price-item-menu">
                            <FaTrashAlt onClick={() => {handleDelete(product.product)}}  style={{ color: 'red' }} /> 
                            ${product.product.price * product.qty}
                        </div>
                    </div>
                ))}
                <p>Total: {cart.products.reduce((acc, product) => acc + (product.product.price * product.qty), 0)}</p>
              </ModalBody>
              
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Send Order
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export { ModalButtonOrder };
