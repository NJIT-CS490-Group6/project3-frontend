import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("app rendering/navigating", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );
  // verify page content for expected route
  // often you'd use a data-testid or role query, but this is also possible
  expect(screen.getByText(/By Group 6/i)).toBeInTheDocument();

  const leftClick = { button: 0 };
  userEvent.click(screen.getByText(/Dashboard/i), leftClick);

  // check that the content changed to the new page
  expect(screen.getByText(/Available/i)).toBeInTheDocument();
});

test("add a friend function rendered", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );

  const leftClick = { button: 0 };
  userEvent.click(screen.getByText(/Dashboard/i), leftClick);

  // check that the content changed to the new page
  expect(screen.getByText(/Add/i)).toBeInTheDocument();
});
