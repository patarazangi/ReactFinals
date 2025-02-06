import { useEffect, useState } from "react";
import { Image, ImageCache, ImageStats } from "../../interfaces";
import axios from "axios";
import useLocalStorage from "../../hooks/useLocalStorage";
import ImageDetails from "../ImageDetails/ImageDetails";

const API_URL = "https://api.unsplash.com/search/photos";
const PHOTOS_PER_PAGE = 20;

interface ImageViewerProps {
  query: string;
}

function ImageViewer({ query }: ImageViewerProps) {
  const [page, setPage] = useState(1);
  const [imageCache, setImageCache] = useLocalStorage<ImageCache>("Cache", {});
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<Image[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [activeImageStats, setActiveImageStats] = useState<ImageStats | null>(
    null
  );
  console.log(errorMsg);
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

  const handleImgDetails = (image: Image) => {
    setSelectedImage(image);
  };

  const fetchImages = async () => {
    try {
      if (query) {
        setLoading(true);
        setErrorMsg("");
        const fullQuery = `query=${query}&page=${page}&per_page=${PHOTOS_PER_PAGE}&client_id=${
          import.meta.env.VITE_API_KEY
        }`;
        let cachedData = imageCache[fullQuery];

        if (!cachedData) {
          const { data } = await axios.get(`${API_URL}?${fullQuery}`);
          cachedData = data;
          // @ts-ignore
          setImageCache((cache) => ({ ...cache, [fullQuery]: data }));
        }

        if (page === 1) setPage(1);
        setImages((prevImages) => [...prevImages, ...cachedData.results]);
      } else {
        return;
      }
    } catch (error) {
      setErrorMsg("Error fething images. Try again later");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setPage(1);
    setImages([]);
  }, [query]);

  useEffect(() => {
    fetchImages();
  }, [page, query]);

  return (
    <>
      {selectedImage && (
        <ImageDetails
          imageStats={activeImageStats}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      )}
      <div className="images">
        {images.map((image, i) => {
          return (
            <div className="for-center" key={`${image.id}-${i}`}>
              <img
                onClick={() => handleImgDetails(image)}
                src={image.urls.small}
                alt="images"
                className="image"
              />
            </div>
          );
        })}
      </div>
      {loading && (
        <div
          style={{
            display: "flex",
            margin: "1rem",
            justifyContent: "center",
            alignItems: "center",
            padding: ".5rem 1rem",
            borderRadius: "1rem",
            border: "none",
            backgroundColor: "lightgray",
          }}
        >
          Loading...
        </div>
      )}
    </>
  );
}

export default ImageViewer;
