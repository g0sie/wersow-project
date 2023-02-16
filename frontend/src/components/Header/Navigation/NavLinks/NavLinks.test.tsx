import "@testing-library/jest-dom/";
import { render, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import NavLinks from "./NavLinks";

describe("<NavLinks />", () => {
  const element = (
    <BrowserRouter>
      <NavLinks />
    </BrowserRouter>
  );

  it("renders component", () => {
    const { getByTestId } = render(element);
    expect(getByTestId("nav-links")).toBeInTheDocument();
  });

  it("renders a link with public access", () => {
    const { getByTestId } = render(element);
    const navLinks = getByTestId("nav-links");
    expect(within(navLinks).queryByText("Home")).toBeInTheDocument();
  });
});
