import { useEffect, useState } from "react";
import Main from "./Main";
import { StopTimeSchema, StopAlertSchema, type StopTime, type StopAlert } from "./schemas";
import Header from "./Header";
import SettingsModal from "./SettingsModal";

const fetchApi = async (stop: string): Promise<any> => {
  const response = await fetch(`https://apiv2.busvertrektijden.nl/stop/${encodeURIComponent(stop).toLowerCase()}`);
  const data = await response.json();
  return data;
};

const parseAlerts = (data: any): StopAlert[] => {
  // Try to parse
  const stopAlerts: StopAlert[] = data["result"]["stop_alerts"].map((sa: any) => StopAlertSchema.parse(sa));
  return stopAlerts;
};

const parseStopTimes = (data: any): StopTime[] => {
  // Try to parse
  const stopTimes: StopTime[] = data["result"]["stop_times"].map((st: any) => StopTimeSchema.parse(st));
  return stopTimes;
};

export default function Webapp() {
  const [tick, setTick] = useState(0);
  const [stop, setStop] = useState("");
  const [stopAlerts, setStopAlerts] = useState<StopAlert[]>([]);
  const [stopTimes, setStopTimes] = useState<StopTime[]>([]);
  const [showSettings, setShowSettings] = useState(false);

  // Functions
  const fetchData = async () => {
    if (stop.length == 0) {
      setStopAlerts([]);
      setStopTimes([]);
      return;
    }

    try {
      const data = await fetchApi(stop);

      const stopAlerts = parseAlerts(data);
      setStopAlerts(stopAlerts);

      const stopTimes = parseStopTimes(data);
      setStopTimes(stopTimes);
    } catch (error) {
      console.error("Error fetching data:", error);
      setStopAlerts([]);
      setStopTimes([]);
    }
  };

  // Effects
  useEffect(() => {
    fetchData();
  }, [stop, tick]);

  // Effects: get / set local storage
  useEffect(() => {
    const storedStop = localStorage.getItem("selectedStop");
    if (storedStop) {
      setStop(storedStop);
    }
  }, []);

  useEffect(() => {
    if (stop.length > 0) {
      localStorage.setItem("selectedStop", stop);
    }
  }, [stop]);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Functions
  const handleSetStop = (newStop: string) => {
    setStop(newStop);
    setShowSettings(false);
  };

  return (
    <div className="h-screen">
      <Header stopName={stop} setShowSettings={setShowSettings} />
      <Main stopTimes={stopTimes} stopAlerts={stopAlerts} />
      {showSettings && <SettingsModal close={() => setShowSettings(false)} setStop={handleSetStop} />}
    </div>
  );
}
