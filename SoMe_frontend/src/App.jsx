// App.js
import { createContext, useState } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export const AppContext = createContext();

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "First Post",
      content: "This is the content of the first post.",
      author: "John Doe",
    },
    {
      id: 2,
      title: "Second Post",
      content: "This is the content of the second post.",
      author: "Jane Smith",
    },
    {
      id: 3,
      title: "Third Post",
      content: "This is the content of the third post.",
      author: "Bob Johnson",
    },
  ]);

  return (
    <AppContext.Provider value={{ posts, setPosts }}>
      <Header />
      <div className="container">
        <Sidebar />
        <div className="body">
          <Dashboard />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
