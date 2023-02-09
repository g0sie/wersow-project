import { createContext } from "react";
import { UserInterface } from "../interfaces/UserInterface";

interface LoggedInUserContextInterface {
  user: UserInterface | null;
  update: () => void;
}

export const LoggedInUserContext = createContext<LoggedInUserContextInterface>({
  user: null,
  update: () => {},
});
