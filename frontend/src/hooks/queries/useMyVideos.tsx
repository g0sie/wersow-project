import { useQuery } from "@tanstack/react-query";
import useLoggedInUser from "./useLoggedInUser";
import { CollectedVideoInterface } from "../../interfaces/CollectedVideoInterface";
import axios from "../../api";

const useMyVideos = () => {
  const { data: user } = useLoggedInUser();

  const videos = useQuery<CollectedVideoInterface[], Error>({
    queryKey: ["myVideos"],
    queryFn: () => {
      return axios
        .get(`users/${user?.id}/videos`)
        .then((res) => res.data.videos);
    },
    enabled: !!user,
  });

  return videos;
};

export default useMyVideos;
