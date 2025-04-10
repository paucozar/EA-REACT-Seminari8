import React, { useState } from "react";
import { User } from "../../types";
import styles from "./UsersList.module.css"; // Import CSS module
import { useNavigate } from "react-router-dom";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const navigate = useNavigate();

  const handleUserClick = (id: string) => {
    navigate(`/update/${id}`);
  };

  return (
    <ul className={styles.list}>
      {users.map((user) => (
        <li
          key={user._id}
          className={styles.listItem}
          onClick={() => handleUserClick(user._id)}
        >
          <div className={styles.userInfo}>
            <h2 className={styles.user}>{user.name}</h2>
            <p className={styles.email}>{user.email}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
