import { useEffect, useState } from "react";
import Main from "./Main";
import Search from "./Search";
import { StopTimeSchema, type StopTime } from "./schemas";

const fetchUrl = async (stop: string): Promise<string> => {
  const response = await fetch(`https://api.busvertrektijden.nl/stops?q=${stop}`);
  const data = await response.json();
  return data["results"][0]["url"];
};

const fetchStopTimes = async (stop: string): Promise<StopTime[] | undefined> => {
  try {
    // Get url
    const url = await fetchUrl(stop);

    // Fetch stop times
    const response = await fetch(`https://api.busvertrektijden.nl${url}`);
    const data = await response.json();

    // Try to parse
    const stopTimes: StopTime[] = data["results"].map((st: any) => StopTimeSchema.parse(st));
    return stopTimes;
  } catch (error) {
    console.error("Error fetching stop times:", error);
    return undefined;
  }
};

export default function Webapp() {
  const [tick, setTick] = useState(0);
  const [stop, setStop] = useState("");
  const [stopTimes, setStopTimes] = useState<StopTime[]>([]);

  // Functions
  const fetchData = async () => {
    if (stop.length == 0) {
      return setStopTimes([]);
    }
    const stops = await fetchStopTimes(stop);
    if (!stops) {
      return setStopTimes([]);
    }
    setStopTimes(stops);
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

  return (
    <div className="h-screen p-4 flex gap-4 flex-col lg:flex-row">
      <Search selectedStop={stop} setStop={setStop} />
      <Main stopTimes={stopTimes} />
    </div>
  );
}
