import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { App } from "../App";

describe("App", () => {
  it("renders the home page heading", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const heading = await screen.findByRole("heading", {
      name: /welcome to movio/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
