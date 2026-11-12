/* ============================================================
   Goodbite — Auth Context
   Authentication state + mock auth service written against a
   real-backend contract:

   · login() / register() return { success, user?, token, error? }
     instead of throwing — only network failures throw (a TypeError,
     exactly like fetch() does).
   · a demo session token is issued on every login/register and
     stored in sessionStorage (kept out of localStorage so it dies
     with the tab — in production the real token belongs in an
     httpOnly cookie set by the server).
   · simulated-failure triggers keep the error paths reachable in a
     demo where any credentials normally succeed:
       - email ending in "@offline.com"  → simulated network outage
       - password "wrongpass"            → invalid credentials
   Replace the "Simulated backend" block with a real fetch() call;
   the Login page already renders every failure kind it produces.
   ============================================================ */
import { createContext, useContext, useState, useCallback } from 'react';
import { MOCK_USER } from '../data/mockData';

const AuthContext = createContext(null);

const USER_KEY = 'goodbite_user';
const TOKEN_KEY = 'goodbite_token';

const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

// Restore session lazily on first render
const loadUser = () => {
  try {
    const stored = sessionStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

// Issue a demo session token and persist user + token together
const persistSession = (profile) => {
  const token = `gb_demo_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 10)}`;
  try {
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(USER_KEY, JSON.stringify(profile));
  } catch {
    /* storage unavailable — session lives in memory only */
  }
  return token;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(loadUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    setError(null);
    await delay(); // simulated request latency

    /* ── Simulated backend ─────────────────────────────────────────
       Swap this block for a real fetch() when the API exists.
       Every failure kind below is rendered by the Login page.     */
    if (/@offline\.com$/i.test(String(email || '').trim())) {
      const netErr = new TypeError('Failed to fetch');
      netErr.kind = 'network';
      setError(netErr);
      setLoading(false);
      throw netErr;
    }
    if (password === 'wrongpass') {
      const authErr = new Error(
        'Invalid email or password. Please check your details and try again.'
      );
      authErr.kind = 'credentials';
      setError(authErr);
      setLoading(false);
      return {
        success: false,
        error: { kind: 'credentials', message: authErr.message },
      };
    }

    const profile = {
      ...MOCK_USER,
      email: String(email || '').trim(),
    };
    const token = persistSession(profile);
    setUser(profile);
    setLoading(false);
    return { success: true, user: profile, token };
  }, []);

  const register = useCallback(async ({ name, email }) => {
    setLoading(true);
    setError(null);
    await delay();
    const profile = {
      ...MOCK_USER,
      name: name || MOCK_USER.name,
      email: String(email || '').trim(),
    };
    const token = persistSession(profile);
    setUser(profile);
    setLoading(false);
    return { success: true, user: profile, token };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    try {
      sessionStorage.removeItem(USER_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const updateProfile = useCallback(
    async (updates) => {
      setLoading(true);
      await delay();
      setUser((prev) => {
        const next = { ...prev, ...updates };
        try {
          sessionStorage.setItem(USER_KEY, JSON.stringify(next));
        } catch {
          /* storage unavailable */
        }
        return next;
      });
      setLoading(false);
    },
    []
  );

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};

export default AuthContext;
