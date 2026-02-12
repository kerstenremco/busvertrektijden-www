import { useState } from "react";

interface SearchProps {
  close: () => void;
  setStop: (stop: string) => void;
}

export default function SettingsModal(props: SearchProps) {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<string[]>([]);

  // Functions
  const performSearch = () => {
    fetch(`https://apiv2.busvertrektijden.nl/stops?search=${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (data["result"]) {
          const names = data["result"].map((stop: any) => stop["stop_name"]);
          setItems(names);
        }
      });
  };

  return (
    <div className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 id="modalTitle" className="text-xl font-bold text-gray-900 sm:text-2xl">
          Bushalte instellen
        </h2>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Zoek halte..."
            className="border p-2 rounded w-96"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="max-h-60 mt-4 overflow-y-scroll">
          {items.map((item, index) => (
            <div key={index} className="p-2 border-b" onClick={() => props.setStop(item)}>
              {item}
            </div>
          ))}
        </div>

        <footer className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
            onClick={props.close}
          >
            Annuleren
          </button>

          <button
            type="button"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            onClick={performSearch}
          >
            Zoeken
          </button>
        </footer>
      </div>
    </div>
  );
}
