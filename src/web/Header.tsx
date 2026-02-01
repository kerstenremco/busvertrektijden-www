import { useEffect, useState } from "react";

interface SearchProps {
  stopName?: string;
  setShowSettings: (show: boolean) => void;
}

export default function Header(props: SearchProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-indigo-800 h-12 flex items-center gap-4 px-4 text-xl text-indigo-50">
      <span className="flex-1">{props.stopName ?? "Selecteer een halte"}</span>
      <span className="font-bold">{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
      <img src="/settings-light.png" alt="Settings" className="cursor-pointer h-3/5" onClick={() => props.setShowSettings(true)} />
    </div>
  );
}
