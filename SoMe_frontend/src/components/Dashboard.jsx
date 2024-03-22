// Dashboard.jsx
import { useContext, useState } from "react";
import { AppContext } from "../App";
import PostList from "./PostList";
import PostForm from "./PostForm";

function Dashboard() {
  const { posts } = useContext(AppContext);
  const { viewPostFlag } = useContext(AppContext);
  const [filterWord, setFilterWord] = useState("");

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(filterWord.toLowerCase()) ||
      post.content.toLowerCase().includes(filterWord.toLowerCase()) ||
      post.user.username.toLowerCase().includes(filterWord.toLowerCase())
  );

  const handleFilterChange = (event) => {
    setFilterWord(event.target.value);
  };

  return (
    <div>
      {viewPostFlag ? (
        <div></div>
      ) : (
        <div>
          <PostForm />
          <div className="filter-form">
            <label
              htmlFor="filter"
              style={{ marginRight: "10px", width: "800px" }}
            >
              Filter:
            </label>
            <input
              type="text"
              id="filter"
              value={filterWord}
              onChange={handleFilterChange}
              placeholder="Enter keyword"
            />
          </div>
        </div>
      )}
      <div className="posts">
        {filteredPosts.length > 0 ? (
          <PostList posts={filteredPosts}></PostList>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
