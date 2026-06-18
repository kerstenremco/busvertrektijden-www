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
    <div className="flex gap-3 items-center">
      <div className="min-w-12 h-12 flex justify-center items-center bg-yellow-600 text-yellow-50 font-bold">
        <span>{stopTime.computed.bus_number}</span>
      </div>
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:gap-2">
          <div>
            {normal && <span className="font-bold">{stopTime.computed.time}</span>}
            {(delay || cancelled) && <span className="line-through">{stopTime.departure_time.substring(0, 5)}</span>}
            {delay && <span className="font-bold text-red-800 ml-0.5">{stopTime.computed.time}</span>}
            {cancelled && <span className="font-bold text-red-800 ml-0.5">Geannuleerd</span>}
          </div>
          <div>
            <span>{stopTime.computed.name}</span>
            <span className="italic ml-0.5">{stopTime.computed.trip_name && `(${stopTime.computed.trip_name})`}</span>
          </div>
        </div>
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
