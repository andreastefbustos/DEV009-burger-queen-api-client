import { render, screen} from "@testing-library/react";
import { Dashboard } from "./Dashboard";
import "@testing-library/jest-dom";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { dashboardLoader } from "./loader";
import { Router } from "@remix-run/router";

import { getUsers } from "../../services/users";
import { getProducts } from "../../services/products";

import fetchMock from "jest-fetch-mock"
fetchMock.enableMocks();


jest.mock("../../services/users", () => ({
  getUsers: jest.fn().mockResolvedValueOnce({
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
  }),
}));

jest.mock("../../services/products", () => ({
  getProducts: jest.fn().mockResolvedValue({
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
  }),
}));

describe("Dasboard", () => {
  let router: Router;

  beforeEach(() => {
    localStorage.setItem("token", "token");
    localStorage.setItem("user", JSON.stringify({role: "admin"}))
    router = createMemoryRouter(routes, {
      initialEntries: ["/dashboard"],
      initialIndex: 0,
    });
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
    }
  ];

  it("renders the users tab by default", () => {
    render(
      <RouterProvider router={router}/>
    );
    
    // Checks if the Users tab content is displayed
    const usersContent = screen.getByText("Users");
    expect(usersContent).toBeInTheDocument();

    const productsContent = screen.getByText("Products");
    expect(productsContent).toBeInTheDocument();

    expect(getUsers).toHaveBeenCalledTimes(1);
    expect(getProducts).toHaveBeenCalledTimes(1);
  });

})