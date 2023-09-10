import { 
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Button } 
from "@nextui-org/react";
import { Form } from "react-router-dom";

type User = {
    id: number;
    email: string;
    role: string;
    status: string;
};

interface ModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    user: User | null;
}

export default function OpenModalDelete({ isOpen, onOpenChange, user}: ModalProps) {
    return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader className="flex flex-col gap-1">Confirmation to delete a user</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this user?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Form method="DELETE" id="deleteUser">
                  <input name="userId" defaultValue={user?.id} hidden></input>
                  <Button color="primary" type="submit" onPress={onClose}>
                    Delete
                  </Button>
                </Form>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
