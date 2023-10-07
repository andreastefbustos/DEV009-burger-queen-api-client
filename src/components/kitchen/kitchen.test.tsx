import "@testing-library/jest-dom";
import { render, waitFor} from "@testing-library/react";
import { getOrders } from "../../services/orders";

import fetchMock from "jest-fetch-mock"
import { KitchenOrders } from "./Kitchen";
import { ordersKitchenLoader } from "./loader";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
fetchMock.enableMocks();

jest.mock("../../services/orders", () => ({
  getOrders: jest.fn(),
}));

jest.mock("../../utilities/utils", () => ({
  ...jest.requireActual('../../utilities/utils'),
  getFormData: jest.fn(),
}));

describe("Render view Kitchen", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  
  const routes = [
    {
      path: '/kitchen',
      element: <KitchenOrders />,
      loader: ordersKitchenLoader,
    },
    {
      path: "/error",
      element: <div />
    },
    {
      path: "/",
      element: <div />
    }
  ];

  it("Render Orders", async () => {
    localStorage.setItem("token", "token");
    localStorage.setItem("user", JSON.stringify({role: "chef"}));

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

    const router = createMemoryRouter(routes, {
      initialEntries: ["/kitchen"],
      initialIndex: 0,
    });
  
    render(
      <RouterProvider router={router}/>
    );

    await waitFor(() => {
      expect(getOrders).toHaveBeenCalledTimes(1);
    })
  });

  it("The user is not log in", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/kitchen"],
      initialIndex: 0,
    });
  
    render(
      <RouterProvider router={router}/>
    );

    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/")
    })
  });

  it("The user is not an chef", async () => {
    localStorage.setItem("token", "token");
    localStorage.setItem("user", JSON.stringify({role: "admin"}));

    const router = createMemoryRouter(routes, {
      initialEntries: ["/kitchen"],
      initialIndex: 0,
    });
  
    render(
      <RouterProvider router={router}/>
    );

    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/error")
    })
  });

  it("The token is expired", async () => {
    localStorage.setItem("token", "token");
    localStorage.setItem("user", JSON.stringify({role: "chef"}));

    (getOrders as jest.Mock).mockResolvedValueOnce({
      status: 401,
      json: jest.fn(),
    });

    const router = createMemoryRouter(routes, {
      initialEntries: ["/kitchen"],
      initialIndex: 0,
    });
  
    render(
      <RouterProvider router={router}/>
    );

    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/")
    })
  });

  it("Fail render orders", async () => {
    localStorage.setItem("token", "token");
    localStorage.setItem("user", JSON.stringify({role: "chef"}));
    
    (getOrders as jest.Mock).mockResolvedValueOnce({
      status: 400,
      json: jest.fn(),
    });

    const router = createMemoryRouter(routes, {
      initialEntries: ["/kitchen"],
      initialIndex: 0,
    });
  
    render(
      <RouterProvider router={router}/>
    );

    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/error');
    })
  });
  
})