import type { StopTime, StopAlert as StopAlertSchema } from "./schemas";
import Stop from "./Stop";
import StopAlert from "./StopAlert";

interface MainProps {
  stopAlerts: StopAlertSchema[];
  stopTimes: StopTime[];
}

export default function Main(props: MainProps) {
  return (
    <div className="w-full flex flex-col gap-3 p-4">
      {props.stopAlerts.map((alert, index) => (
        <StopAlert key={index} stopAlert={alert} index={index} />
      ))}

      {props.stopTimes.map((stop) => (
        <Stop key={stop.trip_id} stopTime={stop} />
      ))}
    </div>
  );
}
