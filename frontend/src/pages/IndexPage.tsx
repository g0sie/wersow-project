import pageStyles from "./Page.module.css";
import Video from "../components/Video/Video";

export const IndexPage = () => {
  return (
    <div className={`${pageStyles.page} ${pageStyles.pageCentered}`}>
      <Video />
    </div>
  );
};

export default IndexPage;
