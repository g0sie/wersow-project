import { useQuery } from "@tanstack/react-query";
import axios from "../api";
import TodaysVideo from "../components/Video/TodaysVideo";
import pageStyles from "./Page.module.css";

export interface VideoInterface {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  publish_date: string;
  todays: boolean;
}

export const IndexPage = () => {
  const todaysVideoQuery = useQuery<VideoInterface, Error>({
    queryKey: ["todaysVideo"],
    queryFn: () => axios.get("/videos/todays").then((res) => res.data),
  });

  return (
    <div className={`${pageStyles.page} ${pageStyles.pageCentered}`}>
      <TodaysVideo todaysVideoQuery={todaysVideoQuery} />
    </div>
  );
};

export default IndexPage;
