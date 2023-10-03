import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Login } from "./login";
import { loginUser } from "../../services/users";
// import { BrowserRouter } from "react-router-dom";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { loginAction } from "./action";
import { getFormData } from "../../utilities/utils";

import fetchMock from "jest-fetch-mock"
fetchMock.enableMocks();


jest.mock("../../services/users", () => ({
  loginUser: jest.fn(),
}));

jest.mock("../../utilities/utils", () => ({
  getFormData: jest.fn(),
}));


jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  // useSubmit: jest.fn(() => {
  //   return jest.fn(); // Retorna una función mock
  // }),
  // useActionData: () => ({ error: false, message: "Dummy message" }),
}));

describe("Login", () => {
  const routes = [
    {
      path: "/",
      element: <Login />,
      action: loginAction,
    },
    {
      path: "/dashboard",
      element: <div />,
    },
    {
      path: "/error"
    }
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/", "/"],
    initialIndex: 1,
  });

  it("Debe redirigir a la página de inicio si las credenciales son correctas", async () => {
    (loginUser as jest.Mock).mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({
        accessToken: "dummy-token",
        user: {role: "admin"}
      }),
    });


    
    render(
      <RouterProvider router={router}/>
    );
    
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Sing in");

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    (getFormData as jest.Mock).mockResolvedValue({
      email: emailInput.value,
      password: passwordInput.value,
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });
});