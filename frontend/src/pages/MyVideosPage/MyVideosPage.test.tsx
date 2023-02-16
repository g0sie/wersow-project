import "@testing-library/jest-dom";
import { getByTestId, render } from "@testing-library/react";
import MyVideosPage from "./MyVideosPage";

describe("<MyVideosPage />", () => {
  it("renders page", () => {
    const { getByTestId } = render(<MyVideosPage />);
    expect(getByTestId("videos-page")).toBeInTheDocument();
  });
});
