
import { 
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Button } 
from "@nextui-org/react";
import { Form } from "react-router-dom";

export type Data = {
    id: number;
    title: string
    message: string
    intent: string
};

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  data: Data | null;
}

export function ModalConfirmDelete({ isOpen, onOpenChange, data}: ModalProps) {
    return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader className="flex flex-col gap-1">{data?.title}</ModalHeader>
              <ModalBody>
                <p>{data?.message}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Form method="DELETE" id="deleteUser">
                  <input name="id" defaultValue={data?.id} hidden></input>
                  <Button color="primary" type="submit" name="intent" value={data?.intent} onPress={onClose}>
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