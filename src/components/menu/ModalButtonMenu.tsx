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
import { Product, ProductCart } from "../../types/product";

interface CartProps {
    cart: {
        products: ProductCart[];
    };
    handleDelete: (product: Product) => void;
    handleQty: (type:string, product: Product) => void;
    sendOrder: (client: string, clientTable: string, products: ProductCart[]) => void;

}

function ModalButtonOrder({cart, handleDelete, handleQty, sendOrder}: CartProps ) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, onClose: () => void) => {
    e.preventDefault();
    const clientName = (e.currentTarget[0] as HTMLInputElement).value;
    const clientTable = (e.currentTarget[1] as HTMLInputElement).value;
    sendOrder(clientName, clientTable, cart.products);
    onClose();
    return false;
  };

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
                <Form className="w-full flex flex-col gap-4" method="POST" id="order" onSubmit={(e) => {handleSubmit(e, onClose)}}>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                        type="name"
                        name="client"
                        label="Client's Name"
                        isRequired
                        />

                        <Input
                        type="name"
                        name="clientTable"
                        label="N* table"
                        isRequired
                        />
                    </div>
                </Form>
               
                {cart.products.map((product: ProductCart) => (
                    <div key={product.product.id} className="item-order" id={`item-${product.product.id}`}>
                        <img 
                        src={product.product.image}
                        alt={product.product.name} 
                        className="img-item-menu"/>
                        <div className="name-qty-item-menu">
                            {product.product.name}
                            <div className="sum-less">
                                <BsDashCircleFill onClick={() => {handleQty("decrement", product.product)}} style={{ color: '#9CA3AF' }}/>
                                    {product.qty}
                                <FaPlusCircle onClick={() => {handleQty("increment", product.product)}} style={{ color: '#9CA3AF' }}/>
                            </div>
                        </div>
                        <div className="trash-price-item-menu">
                            <FaTrashAlt onClick={() => {handleDelete(product.product)}}  style={{ color: 'red' }} /> 
                            ${product.product.price * product.qty}
                        </div>
                    </div>
                ))}
                <p className="sum-total-price-products">Total: ${cart.products.reduce((acc, product) => acc + (product.product.price * product.qty), 0)}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary"  type="submit" form="order">
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
