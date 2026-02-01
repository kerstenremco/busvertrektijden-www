import type { StopTime } from "./schemas";
import Stop from "./Stop";

interface MainProps {
  stopTimes: StopTime[];
}

export default function Main(props: MainProps) {
  return (
    <div className="w-full flex flex-col gap-3 p-4">
      {props.stopTimes.map((stop) => (
        <Stop key={stop.stopTime.tripId} stopTime={stop} />
      ))}
    </div>
  );
}
