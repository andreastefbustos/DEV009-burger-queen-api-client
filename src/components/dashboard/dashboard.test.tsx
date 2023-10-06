import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import { Dashboard } from "./Dashboard";
import "@testing-library/jest-dom";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { dashboardLoader, loaderProduct, loaderUser } from "./loader";
import { getUsers, getUser, createUser, updateUser} from "../../services/users";
import { getProducts, getProduct, createProduct } from "../../services/products";

import fetchMock from "jest-fetch-mock"
import { CreateFromUser } from "./users/CreateUser";
import { createUserAction, updateUserAction } from "./users/action";
import { getFormData } from "../../utilities/utils";
import { Users } from "./users/Users";
import { User } from "../../types/user";
import { UpdateUser } from "./users/UpdateUser";
import { CreateFromProduct } from "./products/CreateProduct";
import { createProductAction } from "./products/action";
import { Products } from "./products/Products";
// import { Users } from "./users/Users";
fetchMock.enableMocks();

jest.mock("../../services/users", () => ({
  getUsers: jest.fn(),
  getUser: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
}));

jest.mock("../../services/products", () => ({
  getProducts: jest.fn(),
  getProduct: jest.fn(),
  createProduct: jest.fn(),
}));

jest.mock("../../utilities/utils", () => ({
  ...jest.requireActual('../../utilities/utils'),
  getFormData: jest.fn(),
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

describe("Users", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("Create a new user successfully", async () => {
    (createUser as jest.Mock).mockResolvedValueOnce({
      status: 201,
      json : jest.fn().mockResolvedValue({
        email: "admin@example.com",
        password: "password123",
        role: "Admin",
      }),
    });

    const routes = [
      {
        path: "/",
        element: <div/>
      },
      {
        path: "/users/create",
        element: <CreateFromUser />,
        action: createUserAction,
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

    const router = createMemoryRouter(routes, {
      initialEntries: ["/users/create"],
      initialIndex: 0,
    });

    render(
      <RouterProvider router={router}/>
    );

    const emailInput = screen.getByLabelText("Email address");
    const passwordInput = screen.getByLabelText("Password");
    const optionRatio = screen.getByText("Admin")
    const submitButton = screen.getByText("Save");

    fireEvent.change(emailInput, {target: {value: "admin@example.com"}});
    fireEvent.change(passwordInput, {target: {value: "password123"}});
    fireEvent.click(optionRatio);

    (getFormData as jest.Mock).mockResolvedValue({
      email: (emailInput as HTMLInputElement).value,
      password: (passwordInput as HTMLInputElement).value,
      role: "Admin",
    });


    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(createUser).toHaveBeenCalledWith((emailInput as HTMLInputElement).value, (passwordInput as HTMLInputElement).value, "Admin");
      expect(router.state.location.pathname).toBe("/dashboard");
    });
  });

  // it("Update a user successfully", async () => {
  //   const newPassword = "password";
  //   //1. Mock inicial para obtener los detalles del usuario 
  //   (getUser as jest.Mock).mockResolvedValueOnce({
  //     status: 200,
  //     json: jest.fn().mockResolvedValueOnce({
  //       id: "1",
  //       email: "example@gmail.com",
  //       password: "password123",
  //       role: "admin",
  //     })
  //   });

  //   (updateUser as jest.Mock).mockResolvedValueOnce({
  //     status: 200,
  //     json: jest.fn().mockResolvedValueOnce({
  //       id: "1",
  //       email: "example@gmail.com",
  //       password: newPassword,
  //       role: "waiter",
  //     })
  //   });


  //   (getFormData as jest.Mock).mockResolvedValue({
  //     password: newPassword,
  //     role: "waiter",
  //   });

  //   const routes = [
  //     {
  //       path: '/users/:id/update',
  //       element: <UpdateUser />,
  //       loader: loaderUser,
  //       action: updateUserAction
  //     },
  //     {
  //       path: '/dashboard',
  //       element: <div/>,
  //     },
  //   ];
  

  //   const router = createMemoryRouter(routes, {
  //     initialEntries: ["/users/1/update"],
  //     initialIndex: 0,
  //   });

  //   render(
  //     <RouterProvider router={router}/>
  //   );

  //   await waitFor(() => {
  //     // expect(updateUser).toHaveBeenCalledWith((passwordInput as HTMLInputElement).value, "Waiter");
  //     expect(getUser).toBeCalledTimes(1);
  //     const passwordInput = screen.getByLabelText("Password");
  //     const optionRatio = screen.getByText("Waiter")
  //     const submitButton = screen.getByText("Save");

  //     fireEvent.change(passwordInput, {target: {value: newPassword}});
  //     fireEvent.click(optionRatio);

  //     fireEvent.click(submitButton);  
  //     console.log(router.state.location.pathname);
  //     expect(router.state.location.pathname).toBe("/dashboard");
  //   });
  // });

  it("Filter users", async () => {
    localStorage.setItem("token", "token");
    localStorage.setItem("user", JSON.stringify({role: "admin"}));
    const users = [
      {
        email: "waiter@gmail.com",
        id: 1,
        password: 'password123',
        role: 'waiter',
        status: ""
      },
      {
        email: "admin@gmail.com",
        id: 2,
        password: 'password123',
        role: 'admin',
        status: ""
      }
    ] as User[];

    const routes = [
      {
        path: "/users",
        element: <Users users={users} />
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/users"],
      initialIndex: 0,
    });

    render(
      <RouterProvider router={router}/>
    );

    const roles = screen.getByText("Role");
    fireEvent.click(roles);

    const checkAdmin = screen.getByText("Admin");
    userEvent.click(checkAdmin);

    const checkChef = screen.getByText("Chef");
    userEvent.click(checkChef);
    
    await waitFor(() => {
      expect(screen.getByText("admin@gmail.com")).toBeInTheDocument();
      expect(screen.queryByText("waiter@gmail.com")).toBeNull();

    })
  });
});

describe("Products", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("Create a new product successfully", async () => {
    (createProduct as jest.Mock).mockResolvedValueOnce({
      status: 201,
      json : jest.fn().mockResolvedValue({
        name: "Pasta",
        price: 5,
        image: "https://example.com/sandwich.jpg",
        type: "Almuerzo y Cena"
      }),
    });

    const routes = [
      {
        path: "/",
        element: <div/>
      },
      {
        path: "/products/create",
        element: <CreateFromProduct />,
        action: createProductAction,
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

    const router = createMemoryRouter(routes, {
      initialEntries: ["/products/create"],
      initialIndex: 0,
    });

    render(
      <RouterProvider router={router}/>
    );

    const nameInput = screen.getByLabelText("Name");
    const priceInput = screen.getByLabelText("Price");
    const imageInput = screen.getByLabelText("Image");
    const optionRatio = screen.getByText("Almuerzo y Cena")
    const submitButton = screen.getByText("Save");

    fireEvent.change(nameInput, {target: {value: "Pasta"}});
    fireEvent.change(priceInput, {target: {value: 5}});
    fireEvent.change(imageInput, {target: {value: "https://example.com/sandwich.jpg"}});
    fireEvent.click(optionRatio);

    (getFormData as jest.Mock).mockResolvedValue({
      name: (nameInput as HTMLInputElement).value,
      price: (priceInput as HTMLInputElement).value,
      image: (imageInput as HTMLInputElement).value,
      type: "Almuerzo y Cena",
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(createProduct).toHaveBeenCalledWith((nameInput as HTMLInputElement).value, (priceInput as HTMLInputElement).value, (imageInput as HTMLInputElement).value, "Almuerzo y Cena");
      expect(router.state.location.pathname).toBe("/dashboard");
    });
  });

  // it("Filter products", async () => {
  //   localStorage.setItem("token", "token");
  //   localStorage.setItem("user", JSON.stringify({role: "admin"}));
  //   const users = [
  //     {
  //       email: "waiter@gmail.com",
  //       id: 1,
  //       password: 'password123',
  //       role: 'waiter',
  //     },
  //     {
  //       email: "admin@gmail.com",
  //       id: 2,
  //       password: 'password123',
  //       role: 'admin',
  //     }
  //   ] as User[];

  //   const routes = [
  //     {
  //       path: "/products",
  //       element: <Products users={users} />
  //     },
  //   ];

  //   const router = createMemoryRouter(routes, {
  //     initialEntries: ["/users"],
  //     initialIndex: 0,
  //   });

  //   render(
  //     <RouterProvider router={router}/>
  //   );

  //   const roles = screen.getByText("Role");
  //   fireEvent.click(roles);

  //   const checkAdmin = screen.getByText("Admin");
  //   userEvent.click(checkAdmin);

  //   const checkChef = screen.getByText("Chef");
  //   userEvent.click(checkChef);
    
  //   await waitFor(() => {
  //     expect(screen.getByText("admin@gmail.com")).toBeInTheDocument();
  //     expect(screen.queryByText("waiter@gmail.com")).toBeNull();

  //   })
  // });
});