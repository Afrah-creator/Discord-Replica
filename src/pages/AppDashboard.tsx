import { useState } from "react";
import { Plus, Hash, Volume2, Settings, Smile, Send, Mic, Headphones, Users, Search, Bell } from "lucide-react";
import { motion } from "framer-motion";
import ServerModal from "@/components/ServerModal";

const demoServers = [
  { id: "home", name: "Home", icon: null },
  { id: "s1", name: "Gaming Hub", icon: "🎮" },
  { id: "s2", name: "Study Group", icon: "📚" },
  { id: "s3", name: "Music Lounge", icon: "🎵" },
];

const demoChannels = [
  { id: "c1", name: "general", type: "text" },
  { id: "c2", name: "memes", type: "text" },
  { id: "c3", name: "homework-help", type: "text" },
  { id: "c4", name: "General", type: "voice" },
  { id: "c5", name: "Gaming", type: "voice" },
];

const demoMessages = [
  { id: "m1", user: "Alex", avatar: "🧑‍💻", content: "Hey everyone! Ready for the study session?", time: "Today at 2:30 PM" },
  { id: "m2", user: "Sarah", avatar: "👩‍🎨", content: "Yeah! I just finished the DSA homework. Graph traversal was tricky 😅", time: "Today at 2:31 PM" },
  { id: "m3", user: "Mike", avatar: "🎮", content: "Same here. The adjacency list implementation made BFS so much cleaner.", time: "Today at 2:33 PM" },
  { id: "m4", user: "Alex", avatar: "🧑‍💻", content: "Let's do a quick review of the priority queue for notifications. Min-heap right?", time: "Today at 2:35 PM" },
  { id: "m5", user: "Sarah", avatar: "👩‍🎨", content: "Yep! O(log n) insert and extract. Mentions get priority 0, reactions get priority 2 🔔", time: "Today at 2:36 PM" },
];

const demoMembers = [
  { id: "u1", name: "Alex", status: "online", avatar: "🧑‍💻" },
  { id: "u2", name: "Sarah", status: "online", avatar: "👩‍🎨" },
  { id: "u3", name: "Mike", status: "idle", avatar: "🎮" },
  { id: "u4", name: "Jordan", status: "dnd", avatar: "🎧" },
  { id: "u5", name: "Sam", status: "offline", avatar: "📱" },
];

const statusColors: Record<string, string> = {
  online: "bg-n8-green",
  idle: "bg-n8-yellow",
  dnd: "bg-destructive",
  offline: "bg-muted-foreground",
};

const AppDashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeServer, setActiveServer] = useState("s1");
  const [activeChannel, setActiveChannel] = useState("c1");
  const [messageInput, setMessageInput] = useState("");

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Server sidebar */}
      <div className="w-[72px] flex-shrink-0 bg-darker-navy flex flex-col items-center py-3 gap-2 overflow-y-auto">
        {/* Home */}
        <button
          onClick={() => setActiveServer("home")}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:rounded-xl ${
            activeServer === "home" ? "gradient-blurple rounded-xl" : "bg-secondary hover:bg-primary"
          }`}
        >
          <span className="text-primary-foreground font-bold text-sm">N8</span>
        </button>

        <div className="w-8 h-0.5 bg-border rounded-full my-1" />

        {/* Servers */}
        {demoServers.filter(s => s.id !== "home").map(server => (
          <button
            key={server.id}
            onClick={() => setActiveServer(server.id)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all hover:rounded-xl ${
              activeServer === server.id ? "gradient-blurple rounded-xl" : "bg-secondary hover:bg-primary"
            }`}
            title={server.name}
          >
            {server.icon}
          </button>
        ))}

        {/* Add server */}
        <button
          onClick={() => setModalOpen(true)}
          className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center hover:rounded-xl hover:bg-n8-green transition-all group"
        >
          <Plus className="text-n8-green group-hover:text-foreground transition-colors" size={24} />
        </button>
      </div>

      {/* Channel sidebar */}
      <div className="w-60 flex-shrink-0 bg-card flex flex-col">
        <div className="h-12 px-4 flex items-center border-b border-border shadow-sm">
          <h2 className="font-bold text-foreground truncate">
            {demoServers.find(s => s.id === activeServer)?.name || "N8"}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-3">
          {/* Text channels */}
          <div className="mb-4">
            <h3 className="px-2 mb-1 text-xs font-bold uppercase text-muted-foreground tracking-wide">Text Channels</h3>
            {demoChannels.filter(c => c.type === "text").map(ch => (
              <button
                key={ch.id}
                onClick={() => setActiveChannel(ch.id)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
                  activeChannel === ch.id
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <Hash size={16} className="flex-shrink-0 opacity-60" />
                <span className="truncate">{ch.name}</span>
              </button>
            ))}
          </div>

          {/* Voice channels */}
          <div>
            <h3 className="px-2 mb-1 text-xs font-bold uppercase text-muted-foreground tracking-wide">Voice Channels</h3>
            {demoChannels.filter(c => c.type === "voice").map(ch => (
              <button
                key={ch.id}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              >
                <Volume2 size={16} className="flex-shrink-0 opacity-60" />
                <span className="truncate">{ch.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* User panel */}
        <div className="h-[52px] bg-darker-navy px-2 flex items-center gap-2">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm">🧑‍💻</div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-n8-green border-2 border-darker-navy" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">You</p>
            <p className="text-[10px] text-muted-foreground">Online</p>
          </div>
          <div className="flex gap-1">
            <button className="p-1 text-muted-foreground hover:text-foreground transition-colors"><Mic size={16} /></button>
            <button className="p-1 text-muted-foreground hover:text-foreground transition-colors"><Headphones size={16} /></button>
            <button className="p-1 text-muted-foreground hover:text-foreground transition-colors"><Settings size={16} /></button>
          </div>
        </div>
      </div>

      {/* Main chat */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <div className="h-12 px-4 flex items-center gap-3 border-b border-border shadow-sm flex-shrink-0">
          <Hash size={20} className="text-muted-foreground" />
          <span className="font-bold text-foreground">
            {demoChannels.find(c => c.id === activeChannel)?.name || "general"}
          </span>
          <div className="ml-auto flex items-center gap-3">
            <button className="text-muted-foreground hover:text-foreground transition-colors"><Bell size={18} /></button>
            <button className="text-muted-foreground hover:text-foreground transition-colors"><Users size={18} /></button>
            <div className="relative">
              <Search size={18} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search"
                className="pl-8 pr-3 py-1 rounded bg-background border-none text-xs text-foreground w-36 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {demoMessages.map((msg, i) => (
            <motion.div
              key={msg.id}
              className="flex gap-3 group hover:bg-secondary/30 -mx-4 px-4 py-1 rounded"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-lg flex-shrink-0 mt-0.5">
                {msg.avatar}
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-medium text-foreground text-sm">{msg.user}</span>
                  <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                </div>
                <p className="text-sm text-secondary-foreground leading-relaxed">{msg.content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Message input */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-2">
            <Plus size={20} className="text-muted-foreground flex-shrink-0 cursor-pointer hover:text-foreground transition-colors" />
            <input
              value={messageInput}
              onChange={e => setMessageInput(e.target.value)}
              placeholder={`Message #${demoChannels.find(c => c.id === activeChannel)?.name || "general"}`}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <Smile size={20} className="text-muted-foreground flex-shrink-0 cursor-pointer hover:text-foreground transition-colors" />
            <Send size={20} className="text-muted-foreground flex-shrink-0 cursor-pointer hover:text-foreground transition-colors" />
          </div>
        </div>
      </div>

      {/* Members sidebar */}
      <div className="w-60 flex-shrink-0 bg-card border-l border-border hidden lg:block overflow-y-auto">
        <div className="px-4 py-4">
          <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-wide mb-3">
            Online — {demoMembers.filter(m => m.status !== "offline").length}
          </h3>
          <div className="space-y-1">
            {demoMembers.filter(m => m.status !== "offline").map(member => (
              <div key={member.id} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-secondary/50 transition-colors cursor-pointer">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm">{member.avatar}</div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ${statusColors[member.status]} border-2 border-card`} />
                </div>
                <span className="text-sm text-muted-foreground">{member.name}</span>
              </div>
            ))}
          </div>

          <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-wide mb-3 mt-6">
            Offline — {demoMembers.filter(m => m.status === "offline").length}
          </h3>
          <div className="space-y-1">
            {demoMembers.filter(m => m.status === "offline").map(member => (
              <div key={member.id} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-secondary/50 transition-colors cursor-pointer opacity-50">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm">{member.avatar}</div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ${statusColors[member.status]} border-2 border-card`} />
                </div>
                <span className="text-sm text-muted-foreground">{member.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ServerModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default AppDashboard;
