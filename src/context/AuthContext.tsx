"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


interface User {
  name: string;
  email: string;

}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

  useEffect(() => {
    // Charger l'utilisateur depuis le localStorage 
    const storedUser = localStorage.getItem("user");
    console.log("Utilisateur stocké :", storedUser); 

    if (storedUser) {
      setUser(JSON.parse(storedUser));

      setIsLoading(false);

    }
    
  }, []);


    // if (isLoading) {
    //     return null; // ou un loader
    // }

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success(`Vous êtes déconnecté(e) ${user?.name}`);
    
    setTimeout(() => {
        router.push("/connexion");
    }, 1000);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
