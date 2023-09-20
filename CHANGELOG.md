## <1.0.0> - <2023-09-20>

### Sprint learnings

* El uso del `useSubmit()` a través de React Router
* Como acceder a la data para poder conectarla con la vista del menu con la orden del pedido.

### Added

* La vista del mesero, donde ve las cart con la información del producto, con su respectiva, imagen, nombre, precio.
* Añadir un bóton en la poarte inferir de la cart para agregar un producto.
* Crear el componente del modal donde tiene el carrito con la información de cada pedido. 
* Este modal esta contituido por el pedido seleccionado del mesero, nombre del cliente, número de mesa, imagen, nombre y precio del producto, un contador para sumar o restar la cantidad del producto, un icono de trash para eliminar el producto seleccionado, cuenta también con el total a pagar, dos botones para cerrar y el otro para enviar el pedido a cocina.
* Implementación del localStorage para la recuperación de la información del pedido.

### Changed

* Cambios en el CSS para la versión del mobile
* Agregar una carpeta para los tipados

### Fixed

* Agregar el tipado del onClose para cerrar el modal del pedido 

### Removed

* Hacer refactorización del código para dejarlo un poco mas limpio. 
