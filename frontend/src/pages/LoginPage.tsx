import formStyles from "../assets/css/form.module.css";
import pageStyles from "./Page.module.css";

const LoginPage = () => {
  return (
    <div className={`${pageStyles.page} ${pageStyles.pageCentered}`}>
      <form>
        <h2 className={formStyles.formHeading}>Sign in to join #teamsówki</h2>
        <input type="email" placeholder="email address" required />
        <input type="password" placeholder="password" required />
        <button type="submit" className="btn">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
