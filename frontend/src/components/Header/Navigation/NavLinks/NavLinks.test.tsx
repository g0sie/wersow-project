import "@testing-library/jest-dom/";
import { render, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { LoggedInUserContext } from "../../../../context/LoggedInUserContext";
// import { NavContext } from "../../../context/NavContext";

import NavLinks from "./NavLinks";

describe("<NavLinks />", () => {
  describe("with logged in user", () => {
    const user = { id: 1, name: "name", email: "email" };
    const element = (
      <LoggedInUserContext.Provider value={{ user: user, update: () => {} }}>
        <BrowserRouter>
          <NavLinks />
        </BrowserRouter>
      </LoggedInUserContext.Provider>
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

    it("renders a link with authenticated access", () => {
      const { getByTestId } = render(element);
      const navLinks = getByTestId("nav-links");
      expect(within(navLinks).queryByText("My Videos")).toBeInTheDocument();
    });
  });

  describe("without logged in user", () => {
    const user = null;
    const element = (
      <LoggedInUserContext.Provider value={{ user: user, update: () => {} }}>
        <BrowserRouter>
          <NavLinks />
        </BrowserRouter>
      </LoggedInUserContext.Provider>
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

    it("doesn't render a link with authenticated access", () => {
      const { getByTestId } = render(element);
      const navLinks = getByTestId("nav-links");
      expect(within(navLinks).queryByText("My Videos")).not.toBeInTheDocument();
    });
  });
});
