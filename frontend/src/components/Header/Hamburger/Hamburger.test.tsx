import "@testing-library/jest-dom/";
import { render, fireEvent } from "@testing-library/react";

import { NavContext } from "../../../context/NavContext";

import Hamburger from "./Hamburger";

describe("<Hamburger />", () => {
  const nav = { isOpened: false, setIsOpened: jest.fn, toggle: jest.fn };
  const { getByTestId } = render(
    <NavContext.Provider value={nav}>
      <Hamburger />
    </NavContext.Provider>
  );
  const hamburger = getByTestId("hamburger");

  it("renders component", () => {
    expect(getByTestId("hamburger")).toBeInTheDocument();
  });

  it("toggles menu on click", () => {
    fireEvent(hamburger, new Event("click"));
    expect(nav.toggle).toHaveBeenCalled;
  });
});
