import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";
import Header from "./Header";

test("renders component", () => {
  const { getByRole } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  expect(getByRole("banner")).toBeInTheDocument();
});
