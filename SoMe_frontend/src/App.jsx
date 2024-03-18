// App.js
import { createContext, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import "./App.css";

export const AppContext = createContext();

function App() {
  const [posts, setPosts] = useState([]);

  return (
    <AppContext.Provider value={{ posts, setPosts }}>
      <header className="header">Social-Media App</header>
      <div className="container">
        <div className="sidebar">
          <button>Home</button>
          <button>Profile</button>
        </div>
        <div className="body">Posts</div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
