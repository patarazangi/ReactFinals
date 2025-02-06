import styled from "styled-components";
import { Image, ImageStats } from "../../interfaces";

const formatter = new Intl.NumberFormat("en-US", { style: "decimal" });

interface ImageDetailsProps {
  imageStats: ImageStats | null;
  setSelectedImage: (state: any) => void;
  selectedImage: Image | null;
}

function ImageDetails({
  imageStats,
  setSelectedImage,
  selectedImage,
}: ImageDetailsProps) {
  return (
    <>
      {selectedImage && (
        <div>
          <ShareLinkContainer>
            <Header>
              <Title>Copy Link</Title>
              <svg
                onClick={() => setSelectedImage(null)}
                className="close"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill=""
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  style={{ fillRule: "evenodd", clipRule: "evenodd" }}
                  d="M28.668 0C35.446 0 40 4.756 40 11.832V28.168C40 35.244 35.446 40 28.666 40H11.33C4.552 40 0 35.244 0 28.168V11.832C0 4.756 4.552 0 11.33 0H28.668ZM28.668 3H11.33C6.27 3 3 6.466 3 11.832V28.168C3 33.534 6.27 37 11.33 37H28.666C33.728 37 37 33.534 37 28.168V11.832C37 6.466 33.728 3 28.668 3ZM16.261 14.1252L19.996 17.86L23.729 14.1294C24.315 13.5434 25.263 13.5434 25.849 14.1294C26.435 14.7154 26.435 15.6634 25.849 16.2494L22.116 19.98L25.853 23.7192C26.439 24.3052 26.439 25.2532 25.853 25.8392C25.561 26.1332 25.175 26.2792 24.793 26.2792C24.409 26.2792 24.025 26.1332 23.733 25.8392L19.996 22.1L16.265 25.8334C15.973 26.1274 15.589 26.2734 15.205 26.2734C14.821 26.2734 14.437 26.1274 14.145 25.8334C13.559 25.2474 13.559 24.2994 14.145 23.7134L17.876 19.98L14.141 16.2452C13.555 15.6592 13.555 14.7112 14.141 14.1252C14.729 13.5392 15.677 13.5392 16.261 14.1252Z"
                  fill=""
                />
              </svg>
            </Header>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <div style={{ width: "200px", height: "200px" }}>
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "1rem",
                  }}
                  src={selectedImage.urls.small}
                  alt="Selected Image"
                  className="image"
                />
              </div>
              {imageStats ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>likes: {formatter.format(imageStats.likes)}</div>
                  <div>downloads: {formatter.format(imageStats.downloads)}</div>
                  <div>views: {formatter.format(imageStats.views)}</div>
                </div>
              ) : (
                <div>Loading Stats...</div>
              )}
            </div>
          </ShareLinkContainer>

          <ContainerOverlay
            onClick={() => {
              setSelectedImage(null);
            }}
          ></ContainerOverlay>
        </div>
      )}
    </>
  );
}

export default ImageDetails;

const ShareLinkContainer = styled.div`
  background-color: lightgray;
  width: 90%;
  max-height: 700px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;

  border-radius: 25px;
  padding: 30px 25px 25px 25px;
  overflow-y: scroll;

  @media screen and (min-width: 800px) {
    padding: 15px 15px 50px 15px;
    width: 85%;
  }

  @media screen and (min-width: 1200px) {
    padding: 50px;
    width: 80%;
    transform: translate(-50%, -50%);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 28px;
  color: var(--titles);
  @media screen and (max-width: 900px) {
    font-size: 18px;
  }
`;

const ContainerOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9998;
  backdrop-filter: blur(5px);
`;
