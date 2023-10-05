import { useState, useMemo } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    useDisclosure,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { VerticalDotsIcon } from "../../../assets/VerticalDotsIcons";
import { ChevronDownIcon } from "../../../assets/ChevronDownIcon";
import { PlusIcon } from "../../../assets/PlusIcon";
import { capitalize } from "../../../utilities/utils";
import { ModalConfirmDelete, Data } from "../../commons/ModalConfirmDelete";
import { Product } from "../../../types/product";

interface ProductsProps {
    products: Product[];
}

const statusOptions = [
  { type: "Desayuno", uid: "desayuno" },
  { type: "Almuerzo y Cena", uid: "almuerzo_cena" },
  { type: "Bebidas", uid: "bebida" },
];

function Products({products}: ProductsProps): JSX.Element {
  const [statusFilter, setStatusFilter] = useState<Set<string>>(new Set());
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredItems = useMemo(() => {
    let filteredProducts = [...products];

    if (statusFilter.size !== 0 && statusFilter.size !== statusOptions.length) {
      filteredProducts = filteredProducts.filter((product) => statusFilter.has(product.type));
    }
    
    return filteredProducts;
  }, [products, statusFilter]);
  
  const data: Data = {
    id: selectedProduct?.id as number,
    title: "Confirmation to delete a product",
    message: "Are you sure you want to delete this product?",
    intent: "product-delete"
  };

  return (
    <div>
      <div className="flex gap-3">
        <Dropdown>
          <DropdownTrigger className="sm:flex" aria-label="Type selection">
            <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">Type</Button>
          </DropdownTrigger>
          <DropdownMenu
          disallowEmptySelection
          aria-label="Table Columns"
          closeOnSelect={false}
          selectedKeys={statusFilter}
          selectionMode="multiple"
          onSelectionChange={(selectedKeys) => {
            if (Array.isArray(selectedKeys)) {
              setStatusFilter(new Set(selectedKeys.filter(item => typeof item === 'string')));
            } else if (selectedKeys instanceof Set) {
              setStatusFilter(new Set(Array.from(selectedKeys).filter(item => typeof item === 'string'))as Set<string>);
            }
          }}
          >
          {statusOptions.map((status) => (
            <DropdownItem key={status.uid} className="capitalize">
              {capitalize(status.type)}
            </DropdownItem>
          ))}
          </DropdownMenu>
        </Dropdown>
        <Button color="primary" endContent={<PlusIcon />}>
          <Link to="products/create">Add New</Link>
        </Button>
      </div>
      <div className="table_information">
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>DATE ENTRY</TableColumn>
            <TableColumn>NAME</TableColumn>
            <TableColumn>TYPE</TableColumn>
            <TableColumn>PRICE</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody>
            {filteredItems.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.dateEntry}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.type}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  <div className="relative flex justify-end items-center gap-2">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly size="sm" variant="light" aria-label="More options">
                          <VerticalDotsIcon className="text-default-300" />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Opciones del usuario">
                        <DropdownItem textValue="Edit">
                          <Link to={`products/${product.id}/update`}>Edit</Link>
                          </DropdownItem>
                        <DropdownItem onPress={() => { setSelectedProduct(product); onOpen()}}>
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ModalConfirmDelete data={data} isOpen={isOpen} onOpenChange={onOpenChange}/>
    </div>
  );
}

export { Products };