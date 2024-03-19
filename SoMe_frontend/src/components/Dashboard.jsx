// Dashboard.jsx
import { useContext, useState } from "react";
import { AppContext } from "../App";
import PostList from "./PostList";
import PostForm from "./PostForm";

function Dashboard({ users }) {
  const { posts } = useContext(AppContext);
  const [filterWord, setFilterWord] = useState("");

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(filterWord.toLowerCase()) ||
      post.content.toLowerCase().includes(filterWord.toLowerCase()) ||
      post.author.toLowerCase().includes(filterWord.toLowerCase())
  );

  const handleFilterChange = (event) => {
    setFilterWord(event.target.value);
  };

  return (
    <div>
      {/* <form className="post-form">
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" placeholder="Title" />
        <label htmlFor="content">Content:</label>
        <textarea id="content" placeholder="Write a new post.."></textarea>
        <button>POST</button>
      </form> */}
      <PostForm users={users} />
      <div className="filter-form">
        <label htmlFor="filter">Filter:</label>
        <input
          type="text"
          id="filter"
          value={filterWord}
          onChange={handleFilterChange}
          placeholder="Enter keyword"
        />
      </div>
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
