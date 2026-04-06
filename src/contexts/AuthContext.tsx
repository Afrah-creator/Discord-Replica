import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const withTimeout = async <T,>(promise: Promise<T>, ms: number, message: string) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<T>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(message)), ms);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
};

const ensureProfileForUser = async (user: User | null) => {
  if (!user) return;
  const email = user.email ?? "";
  const fallbackName = email ? email.split("@")[0] : "user";
  const username = (user.user_metadata?.username as string | undefined) || fallbackName;
  const displayName = (user.user_metadata?.display_name as string | undefined) || username;

  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.warn("Profile lookup failed:", error.message);
    return;
  }
  if (data) return;

  const { error: insertError } = await supabase.from("profiles").insert({
    id: user.id,
    username,
    display_name: displayName,
  });
  if (insertError) {
    console.warn("Profile create failed:", insertError.message);
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const init = async () => {
      try {
        const { data, error } = await withTimeout(
          supabase.auth.getSession(),
          12000,
          "Auth session check timed out. Please check your network and Supabase config."
        );
        if (ignore) return;
        if (error) {
          console.error("Failed to get session:", error.message);
        }
        setSession(data.session ?? null);
        setUser(data.session?.user ?? null);
        await ensureProfileForUser(data.session?.user ?? null);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Auth session check failed.";
        console.error(message);
        setSession(null);
        setUser(null);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    init();

    const { data: subscription } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      await ensureProfileForUser(newSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      ignore = true;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, username: string) => {
    setLoading(true);
    try {
      const { error } = await withTimeout(
        supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
        },
      }),
        12000,
        "Sign up timed out. Please try again."
      );
      if (error) throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await withTimeout(
        supabase.auth.signInWithPassword({ email, password }),
        12000,
        "Sign in timed out. Please check your network and try again."
      );
      if (error) throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await withTimeout(
        supabase.auth.signOut(),
        8000,
        "Sign out timed out. Please try again."
      );
      if (error) throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      session: null,
      user: null,
      loading: false,
      signUp: async () => {},
      signIn: async () => {},
      signOut: async () => {},
    };
  }
  return context;
};
