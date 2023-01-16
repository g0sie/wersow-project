import React from "react";

const LoginPage = () => {
  return (
    <div className="page">
      <form>
        <h2>Sign in to join #teamsówki</h2>
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
