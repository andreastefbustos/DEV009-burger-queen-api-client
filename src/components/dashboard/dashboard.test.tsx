import { render, screen, waitFor} from "@testing-library/react";
import { Dashboard } from "./Dashboard";
import "@testing-library/jest-dom";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { dashboardLoader, loaderProduct, loaderUser } from "./loader";
import { getUsers, getUser } from "../../services/users";
import { getProducts, getProduct } from "../../services/products";

import fetchMock from "jest-fetch-mock"
// import { Users } from "./users/Users";
fetchMock.enableMocks();

jest.mock("../../services/users", () => ({
  getUsers: jest.fn(),
  getUser: jest.fn(),
}));

jest.mock("../../services/products", () => ({
  getProducts: jest.fn(),
  getProduct: jest.fn(),
}));

describe("Dasboard", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const routes = [
    {
      path: '/dashboard',
      element: <Dashboard />,
      loader: dashboardLoader,
    },
    {
      path: "/error",
      element: <div />
    },
    {
      path: "/",
      element: <div/>
    }
  ];

  it("Render dashboard", async () => {
    localStorage.setItem("token", "token");
    localStorage.setItem("user", JSON.stringify({role: "admin"}));

    (getUsers as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValue(
        [
          {
            email: "example@gmail.com",
            id: 1,
            password: 'password123',
            role: 'waiter'
          }
        ]
      ),
    });

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
            type: "almuerzo_cena"
          }
        ]
      ),
    });

    const router = createMemoryRouter(routes, {
      initialEntries: ["/dashboard"],
      initialIndex: 0,
    });

    render(
      <RouterProvider router={router}/>
    );
    
    await waitFor(() => {
      const usersContent = screen.getByText("Users");
      expect(usersContent).toBeInTheDocument();

      const productsContent = screen.getByText("Products");
      expect(productsContent).toBeInTheDocument();

      expect(getUsers).toHaveBeenCalledTimes(1);
      expect(getProducts).toHaveBeenCalledTimes(1);

      const user = screen.getByText("example@gmail.com");
      expect(user).toBeInTheDocument();
    })
  });

  it("The user is not log in", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/dashboard"],
      initialIndex: 0,
    });
  
    render(
      <RouterProvider router={router}/>
    );

    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/")
    })
  });

  it("The user is not an admin", async () => {
    localStorage.setItem("token", "token");
    localStorage.setItem("user", JSON.stringify({role: "chef"}));

    const router = createMemoryRouter(routes, {
      initialEntries: ["/dashboard"],
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
    localStorage.setItem("user", JSON.stringify({role: "admin"}));
    (getProducts as jest.Mock).mockResolvedValueOnce({
      status: 401,
      json: jest.fn(),
    });

    (getUsers as jest.Mock).mockResolvedValueOnce({
      status: 401,
      json: jest.fn(),
    });

    const router = createMemoryRouter(routes, {
      initialEntries: ["/dashboard"],
      initialIndex: 0,
    });
  
    render(
      <RouterProvider router={router}/>
    );

    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/")
    })
  });
});

describe("Loader Functions", () => {
  const mockRequest = new Request("http://test.com", {
    method: "GET",
    headers: new Headers(),
  });

  describe("loaderUser", () => {
    it("Should return user data when getUser is successful", async () => {
      (getUser as jest.Mock).mockResolvedValueOnce({
        status: 200,
        json: jest.fn().mockResolvedValueOnce({
          id: "1",
          email: "example@gmail.com"
        })
      });

      const result = await loaderUser({ params: { id: "1"}, request: mockRequest });
      const data = await result.json();

      expect(data).toEqual({ id: "1", email: "example@gmail.com" });
    });

    it("Should redirect to error when getUser is not successful", async () => {
      (getUser as jest.Mock).mockResolvedValueOnce({
        status: 404,
        json: jest.fn(),
      });

      const result = await loaderUser({ params: { id: "1" }, request: mockRequest });
      expect(result.status).toBe(302);
      expect(result.headers.get("Location")).toBe("/error");
    })
  });

  describe("loaderProduct", () => {
    it("Should return product data when getProduct is successful", async () => {
      (getProduct as jest.Mock).mockResolvedValueOnce({
        status: 200,
        json: jest.fn().mockResolvedValueOnce({
          id: "6",
          name: "Hamburguesa doble"
        })
      });

      const result = await loaderProduct({ params: { id: "6"}, request: mockRequest });
      const data = await result.json();

      expect(data).toEqual({ id: "6", name: "Hamburguesa doble" });
    });

    it("Should redirect to error when getProduct is not successful", async () => {
      (getProduct as jest.Mock).mockResolvedValueOnce({
        status: 404,
        json: jest.fn(),
      });

      const result = await loaderProduct({ params: { id: "6" }, request: mockRequest });
      expect(result.status).toBe(302);
      expect(result.headers.get("Location")).toBe("/error");
    })
  });
});