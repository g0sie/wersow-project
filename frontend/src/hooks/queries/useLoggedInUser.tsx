import { useQuery } from "@tanstack/react-query";
import axios from "../../api";
import { UserInterface } from "../../interfaces/UserInterface";

const useLoggedInUser = () => {
  const user = useQuery<UserInterface | null, Error>({
    queryKey: ["user"],
    queryFn: () =>
      axios
        .get("/users/user", {
          withCredentials: true,
        })
        .then((res) => res.data)
        .catch((error) => {
          console.error(error.toJSON());
          return null;
        }),
  });

  return user;
};

export default useLoggedInUser;
