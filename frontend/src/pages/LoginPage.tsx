import formStyles from "../assets/css/form.module.css";
import pageStyles from "./Page.module.css";

const LoginPage = () => {
  return (
    <div className={`${pageStyles.page} ${pageStyles.pageCentered}`}>
      <form className={formStyles.form}>
        <h2 className={formStyles.formHeading}>Sign in to join #teamsówki</h2>
        <div className={formStyles.inputGroup}>
          <label className={formStyles.label} htmlFor="login-email">
            email:
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            className={formStyles.input}
            required
          />
        </div>
        <div className={formStyles.inputGroup}>
          <label className={formStyles.label} htmlFor="login-email">
            password:
          </label>
          <input
            id="login-password"
            name="password"
            type="password"
            className={formStyles.input}
            required
          />
        </div>
        <button type="submit" className={`btn btnBig ${formStyles.submitBtn}`}>
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
