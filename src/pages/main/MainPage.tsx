import { FormEvent, useEffect, useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { Image, ImageStats } from "../../interfaces";
import ImageViewer from "../../components/ImageViewer/ImageViewer";
import useLocalStorage from "../../hooks/useLocalStorage";

function MainPage({ loading }: any) {
  const inputField = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [history, setHistory] = useLocalStorage<string[]>("history", []);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    const newQuery = inputField.current?.value ?? "";
    // @ts-ignore
    setHistory((prev) => [...new Set([...prev, newQuery])]);
    setQuery(newQuery);
    e.preventDefault();
  };

  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [activeImageStats, setActiveImageStats] = useState<ImageStats | null>(
    null
  );

  console.log(setSelectedImage, activeImageStats, history);

  useEffect(() => {
    if (!selectedImage) return;

    setActiveImageStats(null);
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.unsplash.com/photos/${selectedImage.id}?client_id=${
            import.meta.env.VITE_API_KEY
          }`
        );
        setActiveImageStats(data);
      } catch (error) {
        console.error("Error fetching photo data:", error);
      }
    };

    fetchData();
  }, [selectedImage]);

  return (
    <div className="container" style={{ marginBottom: "19rem" }}>
      <h1 className="title">Search Image</h1>
      <div className="search-section">
        <form onSubmit={handleSearch}>
          <input
            className="search-input"
            style={{ margin: "2rem 0" }}
            placeholder="Find your picture ..."
            ref={inputField}
          />
        </form>
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

export default MainPage;
