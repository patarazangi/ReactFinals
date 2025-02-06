import { useState } from "react";
import ImageViewer from "../../components/ImageViewer/ImageViewer";
import useLocalStorage from "../../hooks/useLocalStorage";

function HistoryPage({ loading }: any) {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useLocalStorage<string[]>("history", []);

  console.log(setHistory);

  return (
    <div className="container" style={{ marginBottom: "19rem" }}>
      <h1 className="title">Your history</h1>
      <div
        style={{
          display: "flex",
          margin: "3rem 1rem 0 1rem",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {history.map((searchedQuery) => (
          <button
            style={{
              padding: ".5rem 1rem",
              borderRadius: "1rem",
              border: "none",
              backgroundColor: "lightgray",
              cursor: "pointer",
            }}
            onClick={() => setQuery(searchedQuery)}
            key={searchedQuery}
          >
            {searchedQuery}
          </button>
        ))}
      </div>

      {query && <ImageViewer query={query} />}

      {loading && (
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            marginTop: "3rem",
          }}
        >
          loading...
        </div>
      )}
    </div>
  );
}

export default HistoryPage;
