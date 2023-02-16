import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../api";

const useLogout = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      axios
        .post(
          "/users/logout",
          {},
          {
            withCredentials: true,
          }
        )
        .catch((error) => {
          console.error(error.toJSON());
        }),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["user"] });
    },
  });

  return mutation;
};

export default useLogout;
