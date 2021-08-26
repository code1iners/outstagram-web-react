import { useHistory } from "react-router-dom";
import { isLoggedInVar, userSignOut } from "../apollo";

const Home = () => {
  const history = useHistory();
  return (
    <div>
      <h1>Welcome!</h1>
      <button onClick={() => userSignOut(history)}>Logout Now!</button>
    </div>
  );
};
export default Home;
