import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import axios from "../../api";
import { LoggedInUserContext } from "../../App";

import TodaysVideo from "../../components/Video/TodaysVideo";
import Button from "../../components/UI/Button/Button";

import pageStyles from "../Page.module.css";

export interface VideoInterface {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  publish_date: string;
  todays: boolean;
}

export const IndexPage = () => {
  const loggedInUser = useContext(LoggedInUserContext);

  const todaysVideoQuery = useQuery<VideoInterface, Error>({
    queryKey: ["todaysVideo"],
    queryFn: () => axios.get("/videos/todays").then((res) => res.data),
  });

  return (
    <div className={`${pageStyles.page} ${pageStyles.pageCentered}`}>
      <TodaysVideo todaysVideoQuery={todaysVideoQuery} />
      <Button type="button" waitingForResponse={todaysVideoQuery.isLoading}>
        {loggedInUser ? "Collect" : "Sign to #teamsówki to collect videos"}
      </Button>
    </div>
  );
};

export default IndexPage;
