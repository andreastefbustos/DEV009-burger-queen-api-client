import "@testing-library/jest-dom";
import { render, screen, waitFor} from "@testing-library/react";
import { getProducts } from "../../services/products";
import { getOrders } from "../../services/orders";
import { ordersLoader, productsLoader } from "./loader";
import { orderAction, updateWaiterOrderAction } from "./action";
import { Menu } from "./Menu";

import fetchMock from "jest-fetch-mock";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { MyOrders } from "./Orders";
fetchMock.enableMocks();

jest.mock("../../services/orders", () => ({
  createOrder: jest.fn(),
  updateOrder: jest.fn(),
}));

jest.mock("../../services/products", () => ({
  getProducts: jest.fn(),
}));

jest.mock("../../services/orders", () => ({
  getOrders: jest.fn(),
}));

jest.mock("../../utilities/utils", () => ({
  ...jest.requireActual('../../utilities/utils'),
  getFormData: jest.fn(),
}));

//Test for Menu
const routerForMenuAndOrders = (initialEntries: string[]) => {
  const routes = [
    {
      path: "/",
      element: <div/>
    },
    {
      path: '/menu',
      element: <Menu />,
      loader: productsLoader,
      action: orderAction,
    },
    {
      path: '/orders',
      element: <MyOrders />,
      loader: ordersLoader,
      action: updateWaiterOrderAction,
    },
    {
      path: "/dashboard",
      element: <div />,
    },
    {
      path: "/error",
      element: <div/>
    }
  ];

  return createMemoryRouter(routes, {
    initialEntries: initialEntries,
    initialIndex: 0,
  });
};

describe("Menu", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("Render products in menu", async () => {
    localStorage.setItem("token", "token");
    localStorage.setItem("user", JSON.stringify({role: "waiter"}));

    (getProducts as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValue(
        [
          {
            dateEntry: "2023-09-12 15:16:05",
            id: 6,
            image: "https://user-images.githubusercontent.com/101216162/267149526-e902c23c-deba-4e2e-9918-182f61cace0f.png",
            name: "Hamburguesa doble",
            price: "15",
            type: "desayuno"
          }
        ]
      ),
    })

    const router = routerForMenuAndOrders(['/menu']);
    render(
      <RouterProvider router={router}/>
    );

    await waitFor(() => {
      expect(getProducts).toHaveBeenCalledTimes(1);
      expect(screen.getByText("Hamburguesa doble")).toBeInTheDocument();
    })
  });

  it("The user is not log in", async () => {
    const router = routerForMenuAndOrders(["/menu"]);
    render(
      <RouterProvider router={router}/>
    );

    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/")
    })
  });

  it("The user is not an waiter", async () => {
    localStorage.setItem("token", "token");
    localStorage.setItem("user", JSON.stringify({role: "chef"}));

    const router = routerForMenuAndOrders(["/menu"]);
    render(
      <RouterProvider router={router}/>
    );

    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/error")
    })
  });

  it("The token is expired", async () => {
    localStorage.setItem("token", "token");
    localStorage.setItem("user", JSON.stringify({role: "waiter"}));
    (getProducts as jest.Mock).mockResolvedValueOnce({
      status: 401,
      json: jest.fn(),
    });

    const router = routerForMenuAndOrders(["/menu"]);
    render(
      <RouterProvider router={router}/>
    );

    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/")
    })
  });
})

//Test para las Ordenes
describe("Orders", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });
  
  it("Render Orders", async () => {
    localStorage.setItem("token", "token");
    localStorage.setItem("user", JSON.stringify({id: 1}));

    (getOrders as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValue(
        [
          {
            client: "Maria",
            table: "2",
            products: {
              qty: 2,
              product: {
                dateEntry: "2023-09-12 15:16:05",
                id: 6,
                image: "https://user-images.githubusercontent.com/101216162/267149526-e902c23c-deba-4e2e-9918-182f61cace0f.png",
                name: "Hamburguesa doble",
                price: "15",
                type: "almuerzo_cena"
              }
            },
            userId: 1,
            status: "pending",
            dataEntry: "01-09-2023",
            dateProcessed: "01-09-2023",
            id: 2,
          }
        ]
      ),
    });

    const router = routerForMenuAndOrders(["/orders"]);
    render(
      <RouterProvider router={router}/>
    );

    await waitFor(() => {
      expect(getOrders).toHaveBeenCalledTimes(1);
      expect(screen.getByText("2")).toBeInTheDocument();
    })
  });

  it("Fail render orders", async () => {
    (getOrders as jest.Mock).mockResolvedValueOnce({
      status: 400,
      json: jest.fn(),
    });

    const router = routerForMenuAndOrders(["/orders"]);
    render(
      <RouterProvider router={router}/>
    );

    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/error");
    })
  });

})