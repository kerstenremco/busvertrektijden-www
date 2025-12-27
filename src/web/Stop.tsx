import type { StopTime } from "./schemas";

interface StopProps {
  stopTime: StopTime;
}

export default function Stop({ stopTime }: StopProps) {
  const delay = stopTime.tripUpdate.delay > 0 && stopTime.tripUpdate.cancelled == false;
  const cancelled = stopTime.tripUpdate.cancelled;
  const normal = !delay && !cancelled;
  const arrivalTime = stopTime.stopTime.arrivalTime.replace("24:", "00:");
  const calculatedArrivalTime = stopTime.tripUpdate.calculatedArrivalTime.replace("24:", "00:");

  return (
    <div className="flex h-12 gap-3">
      <div className="w-12 flex justify-center items-center bg-burning-orange-400">
        <span>{stopTime.stopTime.routeShortName}</span>
      </div>
      <div className="w-96">
        {normal && <span className="font-bold">{arrivalTime}</span>}
        {delay || (cancelled && <span className="line-through">{arrivalTime}</span>)}
        {delay && <span className="font-bold text-red-800 ml-2">{calculatedArrivalTime}</span>}
        {cancelled && <span className="font-bold text-red-800 ml-2">Geannuleerd</span>}
        <p className="line-clamp-1">{stopTime.stopTime.routeLongName}</p>
      </div>
      {normal && <div className="flex items-center text-green-800">{stopTime.tripUpdate.minutesUntill} min</div>}
      {delay && <div className="flex items-center text-red-800">{stopTime.tripUpdate.minutesUntill} min</div>}
      {cancelled && <div className="flex items-center text-red-800 line-through">{stopTime.tripUpdate.minutesUntill} min</div>}
    </div>
  );
}
