import logo from "./logo.svg";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

const App = () => (
  <div className="container">
    <h1>Create Post</h1>
    <PostCreate />
    <hr />

    <h2>All Posts</h2>
    <PostList />
  </div>
);

export default App;
