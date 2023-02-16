import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { LoggedInUserContext } from "../../context/LoggedInUserContext";

import axios from "../../api";
import { CollectedVideoInterface } from "../../interfaces/CollectedVideoInterface";

const useMyVideos = () => {
  const { user } = useContext(LoggedInUserContext);

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
