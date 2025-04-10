import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { User } from "./types";
import Form from "./components/Form";
import UsersList from "./components/UsersList";
import UserUpdate from "./components/UserUpdate/UserUpdate";
import { fetchUsers, LogIn } from "./services/usersService";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUsersNumber, setNewUsersNumber] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error loading users:", error);
        setUsers([]);
      }
    };
    if (isLoggedIn) {
      loadUsers();
    }
  }, [newUsersNumber, isLoggedIn]);

  const handleUpdateUser = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
  };

  return (
    <Router>
      <div className="App">
        {!isLoggedIn ? (
          <Login
            onLogin={({ email, password }) =>
              LogIn(email, password).then((user) => {
                setCurrentUser(user);
                setIsLoggedIn(true);
              })
            }
          />
        ) : (
          <Routes>
            <Route path="/" element={<UsersList users={users} />} />
            <Route
              path="/update/:id"
              element={
                users.length > 0 ? (
                  <UserUpdate users={users} onUpdate={handleUpdateUser} />
                ) : (
                  <p>Loading users...</p>
                )
              }
            />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
