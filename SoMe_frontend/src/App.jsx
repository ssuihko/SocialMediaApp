import { Route, Routes, useLocation } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Profile from "./components/ProfileView";

export const AppContext = createContext();

const API_URL = "https://localhost:7234/";

function App() {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [viewPost, setViewPost] = useState([]);
  const [viewPostFlag, setViewPostFlag] = useState(false);
  const [posts, setPosts] = useState([]);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/post")) {
      setViewPostFlag(true);
    } else {
      setViewPostFlag(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Fetch posts from API_URL
    fetch(API_URL + "posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data); // Update posts state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  useEffect(() => {
    fetch(API_URL + "users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoggedInUser(data[0]);
        console.log(data);
      });
  }, []);

  // const [posts, setPosts] = useState([
  //   {
  //     id: 1,
  //     title: "First Post",
  //     content: "This is the content of the first post.",
  //     userId: 1,
  //     likes: 5,
  //   },
  //   {
  //     id: 2,
  //     title: "Second Post",
  //     content: "This is the content of the second post.",
  //     userId: 2,
  //     likes: 4,
  //   },
  //   {
  //     id: 3,
  //     title: "Third Post",
  //     content: "This is the content of the third post.",
  //     userId: 3,
  //     likes: 2,
  //   },
  // ]);

  const [comments, setComments] = useState([
    {
      id: 1,
      postId: 1,
      user: "Bob",
      userId: 3,
      content: "Bobs comment",
      likes: 2,
    },
    {
      id: 2,
      postId: 2,
      user: "John",
      userId: 1,
      content: "Johns comment",
      likes: 4,
    },
    {
      id: 3,
      postId: 3,
      user: "Jane",
      userId: 2,
      content: "Janes comment",
      likes: 2,
    },
  ]);

  const findPost = (id) => {
    setViewPost([]);
    const postById = posts.find((x) => parseInt(x.postId) === parseInt(id));
    setViewPost([{ ...postById }]);
  };

  return (
    <AppContext.Provider
      value={{
        posts: viewPostFlag ? viewPost : posts,
        viewPostFlag: viewPostFlag,
        setPosts: setPosts,
        comments: comments,
        setComments: setComments,
        loggedInUser: loggedInUser,
        users: users,
        findPost: findPost,
      }}
    >
      <Header />
      <div className="container">
        <Sidebar />
        <div className="body">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/post/:postId" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
