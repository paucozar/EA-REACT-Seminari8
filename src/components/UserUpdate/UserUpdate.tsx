import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { User } from "../../types";
import { updateUser } from "../../services/usersService";
import styles from "./UserUpdate.module.css"; // Import CSS module

interface UserUpdateProps {
  users: User[];
  onUpdate: (updatedUser: User) => void;
}

const UserUpdate: React.FC<UserUpdateProps> = ({ users, onUpdate }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Busca el usuario en la lista de usuarios
  useEffect(() => {
    const user = users.find((u) => u._id === id);
    if (user) {
      setFormData(user);
    } else {
      setError("User not found");
    }
  }, [id, users]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!formData) {
    return <p>Loading...</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser(formData._id, formData);
      onUpdate(updatedUser);
      navigate("/");
    } catch (error) {
      setError("Failed to update user. Please try again.");
    }
  };

  return (
    <div className={styles.updateUserModal}>
      <h2 className={styles.title}>Edit User</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.saveButton}>
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserUpdate;
