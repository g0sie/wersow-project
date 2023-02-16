import { useQuery } from "@tanstack/react-query";
import { VideoInterface } from "../../interfaces/VideoInterface";
import axios from "../../api";

const useTodaysVideo = () => {
  const video = useQuery<VideoInterface, Error>({
    queryKey: ["todaysVideo"],
    queryFn: () => axios.get("/videos/todays").then((res) => res.data),
  });

  return video;
};

export default useTodaysVideo;
