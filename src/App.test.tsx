import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import io from "socket.io-client";
import { User } from "./models/user.model";
import Dashboard from "./pages/Dashboard";
import MainNavbar from "./components/MainNavbar";

jest.mock("socket.io-client", () => {
  const mSocket = {
    on: jest.fn(),
  };
  return jest.fn(() => mSocket);
});

describe("Dashboard", () => {
  const history = createMemoryHistory();
  const currentUser = new User(
    "aaaa",
    "aaaaa",
    "aaaaa",
    123,
    123,
    "jj",
    "jjjjj",
    "hhh",
    "JOHN TESTING"
  );
  const ENDPOINT = "localhost:3000";
  const mockSocket = io(ENDPOINT);

  beforeEach(() => {
    jest.restoreAllMocks();
    render(
      <Router history={history}>
        <MainNavbar currentUser={currentUser} />
        <Dashboard socket={mockSocket} currentUser={currentUser} />
      </Router>
    );
  });

  test("check if navbar updated logged in user to currentUsers name (JOHN TESTING)", () => {
    expect(screen.getByText(/JOHN TESTING/i)).toBeInTheDocument();
  });

  test("check if add a friend function rendered", () => {
    expect(
      screen.getByLabelText(/Enter Friend's Username/i)
    ).toBeInTheDocument();
  });
});
