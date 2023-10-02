import { render } from "@testing-library/react";
import { Login } from "./login";
import { loginUser } from "../../services/users";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock("../../services/users");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSubmit: jest.fn(() => {}),
  useActionData: () => ({ error: false, message: "Dummy message" }),
}));

describe("Login", () => {
  it("Debe redirigir a la página de inicio si las credenciales son correctas", async () => {
    (loginUser as jest.Mock).mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({
        accessToken: "dummy-token",
        user: {role: "admin"}
      }),
    });
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )
  });
})