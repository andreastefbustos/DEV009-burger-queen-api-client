import { 
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Button, 
    useDisclosure 
} from "@nextui-org/react";
import { FaShoppingCart, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import { BsDashCircleFill } from "react-icons/bs";

type ProductCart = {
    id: number;
    name: string;
    price: number;
    image: string;
    qty: number;
  }

interface CartProps {
    cart: {
      products: ProductCart[];
    };
}

function ModalButtonOrder({ cart }: CartProps) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

console.log(cart)
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
                <input placeholder="Client"></input>
                <input placeholder="N table"></input>

                {cart.products.map((product, index) => (
                    <div key={index} className="item-order">
                        <img src={product.image} alt={product.name} style={{width: "70px", height: "70px", borderRadius: "50px"}}/>
                        <p>
                            {product.name}
                            <FaPlusCircle/>{product.qty}<BsDashCircleFill/>
                        </p>
                        <p>
                            <FaTrashAlt /> 
                            ${product.price}
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
