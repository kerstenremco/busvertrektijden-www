import type { StopTime } from "./schemas";

interface StopProps {
  stopTime: StopTime;
}

export default function Stop({ stopTime }: StopProps) {
  const delay = stopTime.realtime.delay > 59 && stopTime.realtime.cancelled == false;
  const cancelled = stopTime.realtime.cancelled;
  const normal = !delay && !cancelled;
  const minutes = Math.round(stopTime.computed.seconds / 60);

  return (
    <div className="flex gap-3">
      <div className="w-12 flex justify-center items-center bg-yellow-600 text-yellow-50 font-bold">
        <span>{stopTime.route_short_name}</span>
      </div>
      <div className="flex-1">
        {normal && <span className="font-bold">{stopTime.computed.time}</span>}
        {(delay || cancelled) && <span className="line-through">{stopTime.departure_time.substring(0, 5)}</span>}
        {delay && <span className="font-bold text-red-800 ml-2">{stopTime.computed.time}</span>}
        {cancelled && <span className="font-bold text-red-800 ml-2">Geannuleerd</span>}
        <span className="ml-2">{stopTime.computed.name}</span>
        <p className="line-clamp-1">{stopTime.route_long_name}</p>
        <div>
          {stopTime.alert?.map((alert, index) => (
            <div key={index}>
              <span className="text-sm text-red-800">⚠️ {alert.header}</span>
              <p className="text-sm text-red-800">{alert.description}</p>
            </div>
          ))}
        </div>
      </div>
      {normal && <div className="flex items-center text-green-800 font-medium">{minutes} min</div>}
      {delay && <div className="flex items-center text-red-800 font-medium">{minutes} min</div>}
      {cancelled && <div className="flex items-center text-red-800 font-medium line-through">{minutes} min</div>}
    </div>
  );
}
