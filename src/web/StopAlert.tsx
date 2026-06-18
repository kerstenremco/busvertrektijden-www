import type { StopAlert } from "./schemas";

interface StopAlertProps {
  stopAlert: StopAlert;
  index: number;
}

export default function StopAlert({ stopAlert, index }: StopAlertProps) {
  return (
    <div key={index}>
      <span className="text-red-800">⚠️ {stopAlert.header}</span>
      <p className="font-light text-red-800">{stopAlert.description}</p>
    </div>
  );
}
