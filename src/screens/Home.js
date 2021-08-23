import { isLoggedInVar, userSignOut } from "../apollo";

const Home = () => {
  return (
    <div>
      <h1>Welcome!</h1>
      <button onClick={() => userSignOut()}>Logout Now!</button>
    </div>
  );
};
export default Home;
