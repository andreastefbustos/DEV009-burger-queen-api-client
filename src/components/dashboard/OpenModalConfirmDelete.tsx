import { 
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Button } 
from "@nextui-org/react";
import { deleteUser } from "./action";
import { redirect } from "react-router-dom";

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
    onDelete: () => void;
}

export default function OpenModalDelete({ isOpen, onOpenChange, user, onDelete}: ModalProps) {
    const handleDelete = async () => {
        if(!user) return;
        const response = await deleteUser(user.id.toString());
        if(response.status === 200) {
            onDelete();
        } else {
            return redirect('/error');
        }

        onOpenChange(false);
    };

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
                <Button color="primary" onPress={handleDelete}>
                  Delete
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
