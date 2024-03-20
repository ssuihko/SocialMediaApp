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
    fetch(API_URL + "posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        console.log("here: ", data);
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
      });
  }, []);

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
        loggedInUser: loggedInUser,
        users: users,
        setUsers: setUsers,
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
