import React, { useState, useContext } from "react";

import { Context } from "../store/appContext";

export const SignUp = () => {
  const { store, actions } = useContext(Context);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userActive, setUserActive] = useState(false);

  console.log(userActive);

  return (
    <div className="container">
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setUserPassword(e.target.value)}
            value={userPassword}
          />
        </div>
        <div class="mb-3 form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="exampleCheck1"
            onChange={(e) => setUserActive(e.target.checked)}
            value={userActive}
          />
          <label class="form-check-label" for="exampleCheck1">
            Active
          </label>
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          onClick={() => actions.loginToken(userEmail, userPassword)}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
