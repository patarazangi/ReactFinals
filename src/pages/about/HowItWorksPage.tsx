import type React from "react"
import styled from "styled-components"
import { Code, Image, Layers, Search } from "lucide-react"

const HowItWorksPage: React.FC = () => {
  return (
    <PageContainer>
      <Title>How My Application Works</Title>

      <Section>
        <SectionTitle>
          <Layers size={24} />
          Overview
        </SectionTitle>
        <Paragraph>
          This application is an image search engine that uses the Unsplash API to fetch and display images based on
          user queries. It features infinite scrolling, image caching, and detailed image information.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>
          <Code size={24} />
          Key Components
        </SectionTitle>
        <ComponentList>
          <ComponentItem>
            <ComponentName>ImageViewer:</ComponentName> Handles image fetching, display, and infinite scrolling.
          </ComponentItem>
          <ComponentItem>
            <ComponentName>MainPage:</ComponentName> Contains the search input and manages the overall application
            state.
          </ComponentItem>
          <ComponentItem>
            <ComponentName>ImageDetails:</ComponentName> Displays detailed information about a selected image.
          </ComponentItem>
        </ComponentList>
      </Section>

      <Section>
        <SectionTitle>
          <Search size={24} />
          How It Works
        </SectionTitle>
        <StepList>
          <StepItem>User enters a search query in the MainPage.</StepItem>
          <StepItem>The query is passed to the ImageViewer component.</StepItem>
          <StepItem>ImageViewer fetches images from the Unsplash API or retrieves them from the cache.</StepItem>
          <StepItem>Images are displayed in a grid layout.</StepItem>
          <StepItem>As the user scrolls, more images are loaded (infinite scrolling).</StepItem>
          <StepItem>Clicking on an image opens the ImageDetails component with additional information.</StepItem>
        </StepList>
      </Section>

      <Section>
        <SectionTitle>
          <Image size={24} />
          Key Features
        </SectionTitle>
        <FeatureList>
          <FeatureItem>Infinite scrolling for seamless image browsing</FeatureItem>
          <FeatureItem>Image caching to improve performance and reduce API calls</FeatureItem>
          <FeatureItem>Detailed image information display</FeatureItem>
          <FeatureItem>Search history tracking</FeatureItem>
        </FeatureList>
      </Section>

      <Section>
        <SectionTitle>
          <Code size={24} />
          Code Snippet: Image Fetching
        </SectionTitle>
        <CodeBlock>
          {`const fetchImages = async () => {
  try {
    if (query) {
      setLoading(true);
      setErrorMsg("");
      const fullQuery = \`query=\${query}&page=\${page}&per_page=\${PHOTOS_PER_PAGE}&client_id=\${
        import.meta.env.VITE_API_KEY
      }\`;
      let cachedData = imageCache[fullQuery];

      if (!cachedData) {
        const { data } = await axios.get(\`\${API_URL}?\${fullQuery}\`);
        cachedData = data;
        setImageCache((cache) => ({ ...cache, [fullQuery]: data }));
      }

      if (page === 1) setPage(1);
      setImages((prevImages) => [...prevImages, ...cachedData.results]);
    }
  } catch (error) {
    setErrorMsg("Error fetching images. Try again later");
    console.log(error);
  } finally {
    setLoading(false);
  }
};`}
        </CodeBlock>
      </Section>
    </PageContainer>
  )
}

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
  border-bottom: 2px solid #6246ea;
  padding-bottom: 0.5rem;
`

const Section = styled.section`
  margin-bottom: 2rem;
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #444;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 1rem;
`

const ComponentList = styled.ul`
  list-style-type: none;
  padding-left: 0;
`

const ComponentItem = styled.li`
  margin-bottom: 0.5rem;
  line-height: 1.6;
  color: #666;
`

const ComponentName = styled.span`
  font-weight: bold;
  color: #6246ea;
`

const StepList = styled.ol`
  padding-left: 1.5rem;
`

const StepItem = styled.li`
  margin-bottom: 0.5rem;
  line-height: 1.6;
  color: #666;
`

const FeatureList = styled.ul`
  list-style-type: none;
  padding-left: 0;
`

const FeatureItem = styled.li`
  margin-bottom: 0.5rem;
  line-height: 1.6;
  color: #666;
  position: relative;
  padding-left: 1.5rem;

  &:before {
    content: "•";
    color: #6246ea;
    font-size: 1.5rem;
    position: absolute;
    left: 0;
    top: -0.2rem;
  }
`

const CodeBlock = styled.pre`
  background-color: #f4f4f4;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9rem;
  line-height: 1.4;
  border: 1px solid #e0e0e0;
`

export default HowItWorksPage

