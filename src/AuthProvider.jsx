import { useCallback, useMemo, useState } from 'react';
import { MOCK_USERS } from './mockUsers.jsx';
import { AuthContext } from './AuthContext.jsx';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback((username, password) => {
    const foundUser = MOCK_USERS[username];
    if (foundUser && foundUser.password === password) {
      setUser({ username, name: foundUser.name });
      return true;
    }
    return false;
  }, []); // Empty dependency array means this function is created only once.

  const logout = useCallback(() => {
    setUser(null);
  }, []); // Empty dependency array means this function is created only once.

  // Memoize the context value to prevent unnecessary re-renders of consumers.
  // The value object will be recreated only when `user` state changes.
  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout,
    }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}