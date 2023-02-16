import { createContext } from "react";

interface NavContextInterface {
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
  toggle: () => void;
}

export const NavContext = createContext<NavContextInterface>({
  isOpened: false,
  setIsOpened: () => {},
  toggle: () => {},
});
