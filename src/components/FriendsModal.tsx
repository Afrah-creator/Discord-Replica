import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UserPlus, Search, Check, XIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Friend, PendingFriendRequest, Profile } from "@/lib/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface FriendsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FriendsModal = ({ isOpen, onClose }: FriendsModalProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<"friends" | "add" | "pending">("friends");
  const [searchUsername, setSearchUsername] = useState("");

  const { data: friends = [] } = useQuery({
    queryKey: ["friends", user?.id],
    enabled: !!user && isOpen,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("friendships")
        .select("*, requester:profiles!friendships_requester_id_fkey(*), addressee:profiles!friendships_addressee_id_fkey(*)")
        .eq("status", "accepted")
        .or(`requester_id.eq.${user!.id},addressee_id.eq.${user!.id}`);
      if (error) throw error;
      return (data || []).map((f: { requester_id: string; addressee_id: string; id: string; addressee: Profile }) => {
        const friend = f.requester_id === user!.id ? f.addressee : f.requester;
        return { ...friend, friendshipId: f.id } as Friend;
      });
    },
  });

  const { data: pendingRequests = [] } = useQuery({
    queryKey: ["pending-friends", user?.id],
    enabled: !!user && isOpen,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("friendships")
        .select("*, requester:profiles!friendships_requester_id_fkey(*)")
        .eq("addressee_id", user!.id)
        .eq("status", "pending");
      if (error) throw error;
      return data || [];
    },
  });

  const sendRequest = useMutation({
    mutationFn: async (username: string) => {
      const { data: target, error: findErr } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", username.trim())
        .maybeSingle();
      if (findErr) throw findErr;
      if (!target) throw new Error("User not found");
      if (target.id === user!.id) throw new Error("You can't add yourself!");
      const { error } = await supabase.from("friendships").insert({
        requester_id: user!.id,
        addressee_id: target.id,
      });
      if (error) {
        if (error.code === "23505") throw new Error("Request already sent");
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Friend request sent!");
      setSearchUsername("");
      queryClient.invalidateQueries({ queryKey: ["pending-friends"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const respondRequest = useMutation({
    mutationFn: async ({ id, accept }: { id: string; accept: boolean }) => {
      if (accept) {
        const { error } = await supabase
          .from("friendships")
          .update({ status: "accepted" })
          .eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("friendships").delete().eq("id", id);
        if (error) throw error;
      }
    },
    onSuccess: (_, { accept }) => {
      toast.success(accept ? "Friend added!" : "Request declined");
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["pending-friends"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/70" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-lg rounded-xl bg-card shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <button onClick={onClose} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors">
              <X size={20} />
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Friends</h2>

              <div className="flex gap-2 mb-6">
                {(["friends", "pending", "add"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      tab === t ? "gradient-blurple text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t === "friends" ? "All" : t === "pending" ? `Pending${pendingRequests.length ? ` (${pendingRequests.length})` : ""}` : "Add Friend"}
                  </button>
                ))}
              </div>

              {tab === "add" && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Enter a username to send a friend request</p>
                  <div className="flex gap-2">
                    <input
                      value={searchUsername}
                      onChange={(e) => setSearchUsername(e.target.value)}
                      placeholder="Username"
                      className="flex-1 px-3 py-2 rounded-md bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      onClick={() => sendRequest.mutate(searchUsername)}
                      disabled={!searchUsername.trim() || sendRequest.isPending}
                      className="px-4 py-2 rounded-md gradient-blurple text-primary-foreground text-sm font-medium disabled:opacity-50"
                    >
                      <UserPlus size={16} />
                    </button>
                  </div>
                </div>
              )}

              {tab === "friends" && (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {friends.length === 0 ? (
                    <p className="text-muted-foreground text-sm text-center py-8">No friends yet. Add some!</p>
                  ) : (
                    friends.map((f: Friend) => (
                      <div key={f.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50">
                        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                          {(f.display_name || f.username)?.[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{f.display_name || f.username}</p>
                          <p className="text-xs text-muted-foreground">@{f.username}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {tab === "pending" && (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {pendingRequests.length === 0 ? (
                    <p className="text-muted-foreground text-sm text-center py-8">No pending requests</p>
                  ) : (
                    pendingRequests.map((r: PendingFriendRequest) => (
                      <div key={r.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50">
                        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                          {(r.requester?.display_name || r.requester?.username)?.[0]?.toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{r.requester?.display_name || r.requester?.username}</p>
                          <p className="text-xs text-muted-foreground">@{r.requester?.username}</p>
                        </div>
                        <button
                          onClick={() => respondRequest.mutate({ id: r.id, accept: true })}
                          className="p-1.5 rounded-full bg-n8-green/20 text-n8-green hover:bg-n8-green/30"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => respondRequest.mutate({ id: r.id, accept: false })}
                          className="p-1.5 rounded-full bg-destructive/20 text-destructive hover:bg-destructive/30"
                        >
                          <XIcon size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FriendsModal;
