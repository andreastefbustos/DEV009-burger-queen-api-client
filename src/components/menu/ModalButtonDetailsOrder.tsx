import { 
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Button,
} from "@nextui-org/react";
import { Form } from "react-router-dom";
import { Order } from "../../types/order";
interface ModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    order: Order | null;
}

function ModalButtonOrderDetail({isOpen, onOpenChange, order}: ModalProps ) {
  return (
    <div className="flex flex-col gap-2">
  
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
              <ModalHeader className="flex flex-col gap-1">Order Details</ModalHeader>
              <ModalBody>
                <Form name="order_delivered" id="order_delivered" method="POST">
                  <input type="text" name="id" defaultValue={order?.id} hidden/>
                </Form>   
                {order?.products.map(productCart => (
                  <div key={productCart.product.id} className="item-order" id={`item-${productCart.product.id}`}>
                    <img 
                    src={productCart.product.image}
                    alt={productCart.product.name} 
                    className="img-item-menu"/>
                    <div className="name-qty-item-menu">
                      {productCart.product.name}
                      <div className="qty-display">
                        Quantity: {productCart.qty}   
                      </div>
                    </div>
                    <div className="price-display">
                        ${productCart.product.price * productCart.qty}
                    </div>
                  </div>
                ))}
                <p className="sum-total-price-products">Total: ${order?.products.reduce((acc, product) => acc + (product.product.price * product.qty), 0)}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                {
                  order?.status === "ready" && ( <Button 
                    className="delivered-button" 
                    color="success"  
                    type="submit" 
                    form="order_delivered"
                    onPress={onClose}>
                      Delivered
                    </Button>)
                }
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export { ModalButtonOrderDetail };
