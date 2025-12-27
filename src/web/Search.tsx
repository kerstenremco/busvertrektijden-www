import { useEffect, useState } from "react";

interface SearchProps {
  selectedStop: string;
  setStop: (stop: string) => void;
}

export default function Search(props: SearchProps) {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<string[]>([]);

  // Functions
  const performSearch = () => {
    fetch(`https://api.busvertrektijden.nl/stops?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (data["results"]) {
          const names = data["results"].map((item: any) => item["name"]);
          setItems(names);
        }
      });
  };

  // Empty list if selected stop changes
  useEffect(() => {
    setItems([]);
  }, [props.selectedStop]);

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Zoek halte..."
          className="border p-2 rounded w-72"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(i) => i.code == "Enter" && performSearch()}
        />
        <button className="bg-burning-orange-100 hover:bg-burning-orange-300 hover:cursor-pointer text-black rounded px-4" onClick={performSearch}>
          Zoeken
        </button>
      </div>
      <div className="my-2">{props.selectedStop}</div>
      <hr className="mb-4" />
      <div>
        {items.map((item, index) => (
          <div key={index} className="p-2 border-b" onClick={() => props.setStop(item)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
