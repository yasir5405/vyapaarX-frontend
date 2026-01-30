import { getMe, logoutUser, type User } from "@/api/auth.api";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const refreshUser = async () => {
    const res = await getMe();

    if (res.success) {
      setUser(res.data);
    } else {
      setUser(null);
      localStorage.removeItem("access-token");
      toast.error(res.error?.message ?? res.message ?? "Session expired");
    }
  };

  useEffect(() => {
    (async () => {
      await refreshUser();
      setLoading(false);
    })();
  }, []);

  const logout = async () => {
    await logoutUser();
    setUser(null);
    localStorage.removeItem("access-token");
  };

  return (
    <AuthContext.Provider value={{ loading, user, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvidor");
  }
  return ctx;
};
