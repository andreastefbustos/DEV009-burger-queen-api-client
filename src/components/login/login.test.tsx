import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Login } from "./login";
import { loginUser } from "../../services/users";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { loginAction } from "./action";
import { getFormData } from "../../utilities/utils";
import { Router } from "@remix-run/router";

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
}));

describe("Login", () => {
  let router: Router;

  beforeEach(() => {
    localStorage.clear()
    router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 0,
    });
  });
  
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
      path: "/menu",
      element: <div />,
    },
    {
      path: "/kitchen",
      element: <div />,
    },
    {
      path: "/error",
      element: <div/>
    }
  ];

  it("If user is admin should be redirect to Dashboard page when credentials are correct", async () => {
    const token = "dummy-token";
    const user = {role: 'admin'};

    (loginUser as jest.Mock).mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({
        accessToken: token,
        user: user
      }),
    });

    render(
      <RouterProvider router={router}/>
    );
    
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Sign in");

    fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    (getFormData as jest.Mock).mockResolvedValue({
      email: (emailInput as HTMLInputElement).value,
      password: (passwordInput as HTMLInputElement).value,
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith((emailInput as HTMLInputElement).value, (passwordInput as HTMLInputElement).value);
      expect(localStorage.__STORE__["token"]).toBe(token);
      expect(localStorage.__STORE__["user"]).toBe(JSON.stringify(user));
      expect(router.state.location.pathname).toBe("/dashboard");
    });
  });

  it("If user is waiter should be redirect to Menu page when credentials are correct", async () => {
    const token = "dummy-token";
    const user = {role: 'waiter'};

    (loginUser as jest.Mock).mockResolvedValue({
      status: 200,
      json : jest.fn().mockResolvedValue({
        accessToken: token,
        user: user,
      }),
    });

    render(
      <RouterProvider router={router}/>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Sign in");

    fireEvent.change(emailInput, {target: {value: "waiter@example.com"}});
    fireEvent.change(passwordInput, {target: {value: "password123"}});

    (getFormData as jest.Mock).mockResolvedValue({
      email: (emailInput as HTMLInputElement).value,
      password: (passwordInput as HTMLInputElement).value,
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith((emailInput as HTMLInputElement).value, (passwordInput as HTMLInputElement).value);
      expect(localStorage.__STORE__["token"]).toBe(token);
      expect(localStorage.__STORE__["user"]).toBe(JSON.stringify(user));
      expect(router.state.location.pathname).toBe("/menu")
    });
  });

  it("If user is chef should be redirect to Menu page when credentials are correct", async () => {
    const token = "dummy-token";
    const user = {role: 'chef'};

    (loginUser as jest.Mock).mockResolvedValue({
      status: 200,
      json : jest.fn().mockResolvedValue({
        accessToken: token,
        user: user,
      }),
    });

    render(
      <RouterProvider router={router}/>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Sign in");

    fireEvent.change(emailInput, {target: {value: "chef@example.com"}});
    fireEvent.change(passwordInput, {target: {value: "password123"}});

    (getFormData as jest.Mock).mockResolvedValue({
      email: (emailInput as HTMLInputElement).value,
      password: (passwordInput as HTMLInputElement).value,
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith((emailInput as HTMLInputElement).value, (passwordInput as HTMLInputElement).value);
      expect(localStorage.__STORE__["token"]).toBe(token);
      expect(localStorage.__STORE__["user"]).toBe(JSON.stringify(user));
      expect(router.state.location.pathname).toBe("/kitchen")
    });
  });

  it("If user is chef should be redirect to Menu page when credentials are correct", async () => {
    const token = "dummy-token";
    const user = {role: 'unknownRole'};

    (loginUser as jest.Mock).mockResolvedValue({
      status: 200,
      json : jest.fn().mockResolvedValue({
        accessToken: token,
        user: user,
      }),
    });

    render(
      <RouterProvider router={router}/>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Sign in");

    fireEvent.change(emailInput, {target: {value: "test@example.com"}});
    fireEvent.change(passwordInput, {target: {value: "password123"}});

    (getFormData as jest.Mock).mockResolvedValue({
      email: (emailInput as HTMLInputElement).value,
      password: (passwordInput as HTMLInputElement).value,
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith((emailInput as HTMLInputElement).value, (passwordInput as HTMLInputElement).value);
      expect(localStorage.__STORE__["token"]).toBe(token);
      expect(localStorage.__STORE__["user"]).toBe(JSON.stringify(user));
      expect(router.state.location.pathname).toBe("/error")
    });
  });

  it("An alert message should be displayed when the status is different than 200", async () => {
    (loginUser as jest.Mock).mockResolvedValue({
      status: 400,
      json: jest.fn().mockResolvedValue({
        error: "Invalid credential*"
      }),
    });

    render(
      <RouterProvider router={router} />
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Sign in");

    fireEvent.change(emailInput, {target: {value: 'invalid@example.com'}});
    fireEvent.change(passwordInput, {target: {value: 'wrongpassword'}});

    (getFormData as jest.Mock).mockResolvedValue({
      email: (emailInput as HTMLInputElement).value,
      password: (passwordInput as HTMLInputElement).value,
    });

    fireEvent.click(submitButton);

    await screen.findByText("Invalid credential*");
    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith('invalid@example.com', 'wrongpassword');
      expect(localStorage.__STORE__["token"]).toBe(undefined);
      expect(localStorage.__STORE__["user"]).toBe(undefined);
      expect(router.state.location.pathname).toBe("/");
    });
  });
});