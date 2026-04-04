import { useState, useEffect, useRef } from "react";
import { Plus, Hash, Volume2, Settings, Smile, Send, Mic, Headphones, Users, Search, Bell, UserPlus, LogOut, Copy, Home } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import ServerModal from "@/components/ServerModal";
import FriendsModal from "@/components/FriendsModal";

const AppDashboard = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [friendsOpen, setFriendsOpen] = useState(false);
  const [activeServer, setActiveServer] = useState<string | null>(null);
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", user!.id).single();
      return data;
    },
  });

  const { data: servers = [] } = useQuery({
    queryKey: ["servers", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data: memberships } = await supabase
        .from("server_members")
        .select("server_id")
        .eq("user_id", user!.id);
      if (!memberships?.length) return [];
      const serverIds = memberships.map((m) => m.server_id);
      const { data } = await supabase.from("servers").select("*").in("id", serverIds);
      return data || [];
    },
  });

  useEffect(() => {
    if (servers.length > 0 && !activeServer) {
      setActiveServer(servers[0].id);
    }
  }, [servers, activeServer]);

  const { data: channels = [] } = useQuery({
    queryKey: ["channels", activeServer],
    enabled: !!activeServer,
    queryFn: async () => {
      const { data } = await supabase.from("channels").select("*").eq("server_id", activeServer!).order("created_at");
      return data || [];
    },
  });

  useEffect(() => {
    if (channels.length > 0 && !activeChannel) {
      const textCh = channels.find((c) => c.type === "text");
      setActiveChannel(textCh?.id || channels[0].id);
    }
  }, [channels, activeChannel]);

  const { data: messages = [] } = useQuery({
    queryKey: ["messages", activeChannel],
    enabled: !!activeChannel,
    refetchInterval: 3000,
    queryFn: async () => {
      const { data } = await supabase
        .from("messages")
        .select("*, profile:profiles!messages_user_id_fkey(*)")
        .eq("channel_id", activeChannel!)
        .order("created_at", { ascending: true })
        .limit(50);
      return data || [];
    },
  });

  const { data: members = [] } = useQuery({
    queryKey: ["members", activeServer],
    enabled: !!activeServer,
    queryFn: async () => {
      const { data } = await supabase
        .from("server_members")
        .select("*, profile:profiles!server_members_user_id_fkey(*)")
        .eq("server_id", activeServer!);
      return data || [];
    },
  });

  const sendMessage = useMutation({
    mutationFn: async (content: string) => {
      const { error } = await supabase.from("messages").insert({
        channel_id: activeChannel!,
        user_id: user!.id,
        content,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setMessageInput("");
      queryClient.invalidateQueries({ queryKey: ["messages", activeChannel] });
    },
    onError: (err: any) => toast.error(err.message),
  });

  const handleSend = () => {
    if (!messageInput.trim() || !activeChannel) return;
    sendMessage.mutate(messageInput.trim());
  };

  const activeServerData = servers.find((s) => s.id === activeServer);
  const activeChannelData = channels.find((c) => c.id === activeChannel);

  if (authLoading || !user) return <div className="flex h-screen items-center justify-center bg-background text-foreground">Loading...</div>;

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Server sidebar */}
      <div className="w-[72px] flex-shrink-0 bg-darker-navy flex flex-col items-center py-3 gap-2 overflow-y-auto">
        {/* Home button */}
        <button
          onClick={() => { setActiveServer(null); setActiveChannel(null); }}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:rounded-xl ${
            !activeServer ? "gradient-blurple rounded-xl" : "bg-secondary hover:bg-primary"
          }`}
          title="Home"
        >
          <Home className="text-foreground" size={20} />
        </button>

        <div className="w-8 h-0.5 bg-border rounded-full my-1" />

        {/* Friends button */}
        <button
          onClick={() => setFriendsOpen(true)}
          className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:rounded-xl bg-secondary hover:bg-primary"
          title="Friends"
        >
          <UserPlus className="text-foreground" size={20} />
        </button>

        <div className="w-8 h-0.5 bg-border rounded-full my-1" />

        {servers.map((server) => (
          <button
            key={server.id}
            onClick={() => {
              setActiveServer(server.id);
              setActiveChannel(null);
            }}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-bold transition-all hover:rounded-xl ${
              activeServer === server.id ? "gradient-blurple rounded-xl text-primary-foreground" : "bg-secondary hover:bg-primary text-foreground"
            }`}
            title={server.name}
          >
            {server.name.substring(0, 2).toUpperCase()}
          </button>
        ))}

        <button
          onClick={() => setModalOpen(true)}
          className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center hover:rounded-xl hover:bg-n8-green transition-all group"
        >
          <Plus className="text-n8-green group-hover:text-foreground transition-colors" size={24} />
        </button>
      </div>

      {/* Channel sidebar */}
      <div className="w-60 flex-shrink-0 bg-card flex flex-col">
        <div className="h-12 px-4 flex items-center justify-between border-b border-border shadow-sm">
          <h2 className="font-bold text-foreground truncate">{activeServerData?.name || "N8"}</h2>
          {activeServerData?.invite_code && (
            <button
              onClick={() => {
                navigator.clipboard.writeText(activeServerData.invite_code!);
                toast.success("Invite code copied!");
              }}
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Copy invite code"
            >
              <Copy size={14} />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-3">
          {channels.filter((c) => c.type === "text").length > 0 && (
            <div className="mb-4">
              <h3 className="px-2 mb-1 text-xs font-bold uppercase text-muted-foreground tracking-wide">Text Channels</h3>
              {channels.filter((c) => c.type === "text").map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setActiveChannel(ch.id)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
                    activeChannel === ch.id ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <Hash size={16} className="flex-shrink-0 opacity-60" />
                  <span className="truncate">{ch.name}</span>
                </button>
              ))}
            </div>
          )}
          {channels.filter((c) => c.type === "voice").length > 0 && (
            <div>
              <h3 className="px-2 mb-1 text-xs font-bold uppercase text-muted-foreground tracking-wide">Voice Channels</h3>
              {channels.filter((c) => c.type === "voice").map((ch) => (
                <button key={ch.id} className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
                  <Volume2 size={16} className="flex-shrink-0 opacity-60" />
                  <span className="truncate">{ch.name}</span>
                </button>
              ))}
            </div>
          )}
          {servers.length === 0 && (
            <div className="text-center text-muted-foreground text-sm py-8 px-4">
              <p>No servers yet!</p>
              <p className="text-xs mt-1">Click the + to create or join one</p>
            </div>
          )}
        </div>

        {/* User panel */}
        <div className="h-[52px] bg-darker-navy px-2 flex items-center gap-2">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
              {(profile?.display_name || profile?.username || "U")[0].toUpperCase()}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-n8-green border-2 border-darker-navy" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">{profile?.display_name || profile?.username}</p>
            <p className="text-[10px] text-muted-foreground">Online</p>
          </div>
          <div className="flex gap-1">
            <button className="p-1 text-muted-foreground hover:text-foreground transition-colors"><Mic size={16} /></button>
            <button className="p-1 text-muted-foreground hover:text-foreground transition-colors"><Headphones size={16} /></button>
            <button onClick={() => navigate("/settings")} className="p-1 text-muted-foreground hover:text-foreground transition-colors" title="Settings"><Settings size={16} /></button>
            <button onClick={() => { signOut(); navigate("/"); }} className="p-1 text-muted-foreground hover:text-destructive transition-colors" title="Log out"><LogOut size={16} /></button>
          </div>
        </div>
      </div>

      {/* Main chat */}
      <div className="flex-1 flex flex-col min-w-0">
        {!activeServer ? (
          /* Home / Welcome view */
          <>
            <div className="h-12 px-4 flex items-center gap-3 border-b border-border shadow-sm flex-shrink-0">
              <Home size={20} className="text-muted-foreground" />
              <span className="font-bold text-foreground">Home</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md px-6">
                <div className="w-20 h-20 rounded-full gradient-blurple flex items-center justify-center mx-auto mb-6">
                  <Users size={36} className="text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">Welcome to N8!</h2>
                <p className="text-muted-foreground mb-6">Create a server, join one with an invite code, or add friends to get started.</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full gradient-blurple text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <Plus size={16} /> Create Server
                  </button>
                  <button
                    onClick={() => setFriendsOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary text-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
                  >
                    <UserPlus size={16} /> Add Friends
                  </button>
                  <button
                    onClick={() => navigate("/settings")}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary text-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
                  >
                    <Settings size={16} /> Settings
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Server chat view */
          <>
            <div className="h-12 px-4 flex items-center gap-3 border-b border-border shadow-sm flex-shrink-0">
              <Hash size={20} className="text-muted-foreground" />
              <span className="font-bold text-foreground">{activeChannelData?.name || "general"}</span>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.length === 0 && activeChannel && (
                <div className="text-center text-muted-foreground text-sm py-12">
                  <p className="text-lg mb-1">Welcome to #{activeChannelData?.name}!</p>
                  <p>This is the beginning of this channel. Say hi! 👋</p>
                </div>
              )}
              {messages.map((msg: any, i: number) => (
                <motion.div
                  key={msg.id}
                  className="flex gap-3 group hover:bg-secondary/30 -mx-4 px-4 py-1 rounded"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5 text-primary-foreground">
                    {(msg.profile?.display_name || msg.profile?.username || "U")[0].toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="font-medium text-foreground text-sm">{msg.profile?.display_name || msg.profile?.username}</span>
                      <span className="text-[10px] text-muted-foreground">{new Date(msg.created_at).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-secondary-foreground leading-relaxed">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {activeChannel && (
              <div className="px-4 pb-4">
                <div className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-2">
                  <input
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder={`Message #${activeChannelData?.name || "general"}`}
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                  <button onClick={handleSend} className="text-muted-foreground hover:text-foreground transition-colors">
                    <Send size={20} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Members sidebar */}
      <div className="w-60 flex-shrink-0 bg-card border-l border-border hidden lg:block overflow-y-auto">
        <div className="px-4 py-4">
          <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-wide mb-3">
            Members — {members.length}
          </h3>
          <div className="space-y-1">
            {members.map((m: any) => (
              <div key={m.id} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-secondary/50 transition-colors cursor-pointer">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-bold">
                    {(m.profile?.display_name || m.profile?.username || "U")[0].toUpperCase()}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-n8-green border-2 border-card" />
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{m.profile?.display_name || m.profile?.username}</span>
                  {m.role === "owner" && <span className="text-[10px] text-n8-yellow ml-1">👑</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ServerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onServerCreated={() => queryClient.invalidateQueries({ queryKey: ["servers"] })}
      />
      <FriendsModal isOpen={friendsOpen} onClose={() => setFriendsOpen(false)} />
    </div>
  );
};

export default AppDashboard;
