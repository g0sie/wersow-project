import pageStyles from "../Page.module.css";

const MyVideosPage = () => {
  return (
    <div
      className={[pageStyles.page, pageStyles.pageCentered].join(" ")}
      style={{ color: "white", fontSize: "3rem" }}
      data-testid="videos-page"
    >
      Oh no, it's not implemented yet! :O
    </div>
  );
};

export default MyVideosPage;
