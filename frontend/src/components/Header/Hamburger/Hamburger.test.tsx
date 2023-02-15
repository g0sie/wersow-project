import "@testing-library/jest-dom/";
import { render } from "@testing-library/react";

import Hamburger from "./Hamburger";

test("renders component", () => {
  const { getByTestId } = render(<Hamburger />);
  expect(getByTestId("hamburger")).toBeInTheDocument();
});
