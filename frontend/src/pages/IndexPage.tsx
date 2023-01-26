import pageStyles from "./Page.module.css";
import TodaysVideo from "../components/Video/TodaysVideo";

export const IndexPage = () => {
  return (
    <div className={`${pageStyles.page} ${pageStyles.pageCentered}`}>
      <TodaysVideo />
    </div>
  );
};

export default IndexPage;
