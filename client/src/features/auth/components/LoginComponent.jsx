import { login } from "../authThunks.js";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const LoginComponent = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login_loading, login_error } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const submitHandler = async e => {
    e.preventDefault();
    dispatch(login({ email, password }));
    history.push("/");
  };

  if (login_loading) return <h1>Loading...</h1>;
  if (login_error !== "") return <h1>{login_error}</h1>;

  return (
    <div>
      <form method="POST" onSubmit={submitHandler}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
          id="email"
          placeholder="Enter your email"
        />
        <input
          type="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
          name="password"
          id="password"
          placeholder="Enter your password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginComponent;
