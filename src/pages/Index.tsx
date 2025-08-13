import { useState, useEffect } from "react";
import { AuthForm } from "@/components/AuthForm";
import { Dashboard } from "@/components/Dashboard";

interface User {
  email: string;
  name: string;
  phone: string;
  gender: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = localStorage.getItem("mylogn_current_user");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem("mylogn_current_user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("mylogn_current_user");
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("mylogn_current_user", JSON.stringify(updatedUser));
  };

  if (user) {
    return (
      <Dashboard 
        user={user} 
        onLogout={handleLogout}
        onUpdateUser={handleUpdateUser}
      />
    );
  }

  return <AuthForm onLogin={handleLogin} />;
};

export default Index;
