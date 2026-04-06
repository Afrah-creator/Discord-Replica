import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import { fetchLiveKitToken } from "@/lib/backend";
import { toast } from "sonner";

interface LiveKitCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: string;
  identity: string;
  name: string;
}

const LiveKitCallModal = ({ isOpen, onClose, room, identity, name }: LiveKitCallModalProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadToken = () => {
    setToken(null);
    setUrl(null);
    setError(null);
    fetchLiveKitToken(room, identity, name)
      .then((res) => {
        setToken(res.token);
        setUrl(res.url);
      })
      .catch((err) => {
        const message = err instanceof Error ? err.message : "Failed to start call";
        setError(message);
        toast.error(message);
      });
  };

  useEffect(() => {
    if (!isOpen) return;
    loadToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, room, identity, name]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground z-[70]"
          >
            <X size={24} />
          </button>

          <div className="w-full h-full">
            {token && url ? (
              <LiveKitRoom
                token={token}
                serverUrl={url}
                connect
                audio
                video
                data-lk-theme="default"
                className="h-full"
                onDisconnected={() => {
                  toast.info("Call ended");
                }}
              >
                <VideoConference />
              </LiveKitRoom>
            ) : error ? (
              <div className="flex h-full items-center justify-center text-center text-muted-foreground px-6">
                <div>
                  <p className="mb-4">Call failed to start.</p>
                  <button
                    onClick={loadToken}
                    className="px-4 py-2 rounded-md bg-secondary text-foreground hover:bg-secondary/80 text-sm"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">Starting call...</div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LiveKitCallModal;
