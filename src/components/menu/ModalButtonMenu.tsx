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
}

function ModalButtonOrder({ cart }: CartProps) {
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
                    <div key={index} className="item-order">
                        <img 
                        src={product.product.image} 
                        alt={product.product.name} 
                        className="img-item-menu"/>
                        <p className="name-qty-item-menu">
                            {product.product.name}
                            <div className="sum-less">
                                <FaPlusCircle style={{ color: '#9CA3AF' }}/>
                                    {product.qty}
                                <BsDashCircleFill style={{ color: '#9CA3AF' }}/>
                            </div>
                        </p>
                        <p className="trash-price-item-menu">
                            <FaTrashAlt style={{ color: 'red' }}/> 
                            ${product.product.price}
                        </p>
                    </div>
                ))}

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
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
