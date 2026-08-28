import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import Loader from "../components/Loader";
import Errors from "../components/Errors";

const carouselProps = {
  autoPlay: true,
  interval: 2000,
  infiniteLoop: true,
  showThumbs: false,
  showIndicators: false,
  emulateTouch: true,
  stopOnHover: true,
  transitionTime: 1000,
};

/** Image + prose block, alternating sides. */
function SplitSection({ eyebrow, title, image, children, background, flip = false }) {
  return (
    <section className={`${background} py-16 md:py-24`}>
      <Container
        className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
          flip ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <Reveal className="relative">
          <div className="absolute -left-[18px] -top-[18px] w-[150px] h-[150px] bg-accent z-0" />
          <div className="relative z-[1] aspect-[4/3] bg-surface overflow-hidden">
            {image && <img src={image} alt={title} className="w-full h-full object-cover" />}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <SectionHeading eyebrow={eyebrow} title={title} />
          <div className="mt-6 text-[17px] leading-[1.75] text-muted max-w-[56ch] whitespace-pre-line">
            {children}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/** Numbered list rendered from a string array (pastEvents / achievements). */
function ListSection({ eyebrow, title, image, items = [], background }) {
  if (!items.length && !image) return null;

  return (
    <section className={`${background} py-16 md:py-24`}>
      <Container className="grid grid-cols-1 lg:grid-cols-[.8fr_1.2fr] gap-12 lg:gap-20 items-start">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} />
          {image && (
            <div className="relative mt-8 aspect-[4/3] bg-surface overflow-hidden">
              <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>
          )}
        </Reveal>
        <Reveal delay={0.1} className="border-t border-line">
          {items.map((item, i) => (
            <div
              key={`${item}-${i}`}
              className="grid grid-cols-[40px_1fr] md:grid-cols-[56px_1fr] items-start gap-4 md:gap-6 py-[22px] px-2 border-b border-line transition-all duration-200 hover:bg-surface hover:pl-4"
            >
              <span className="font-poppins text-xs font-semibold tracking-[0.1em] text-[#B5B5B5] pt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[17px] leading-[1.6] text-ink">{item}</span>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

function CarouselSection({ eyebrow, title, images = [], background }) {
  if (!images.length) return null;

  return (
    <section className={`${background} py-16 md:py-24`}>
      <Container>
        <Reveal className="mb-9">
          <SectionHeading eyebrow={eyebrow} title={title} />
        </Reveal>
        <Reveal delay={0.08}>
          <Carousel {...carouselProps}>
            {images.map((src, i) => (
              <div key={`${src}-${i}`} className="aspect-[16/9] bg-surface overflow-hidden">
                <img src={src} alt={`${title} ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </Carousel>
        </Reveal>
      </Container>
    </section>
  );
}

function EachClubPage() {
  const { name } = useParams();
  const [clubData, setClubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClub = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/club/${encodeURIComponent(name)}`);
        setClubData(response.data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClub();
  }, [name]);

  if (loading) return <Loader isOpen message={`Loading ${name} club…`} />;

  if (error || !clubData)
    return (
      <Errors
        status_code={error?.response?.status || 500}
        title="Couldn't load this club"
        message="The server didn't respond, or no club matches this address. Try again in a moment."
        buttonText="Retry"
        onClick={() => window.location.reload()}
      />
    );

  return (
    <div className="w-full">
      {/* Hero */}
      <section
        className="relative min-h-[380px] md:min-h-[520px] flex items-end overflow-hidden bg-slate bg-cover bg-top bg-no-repeat"
        style={clubData.img ? { backgroundImage: `url(${clubData.img})` } : undefined}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,13,13,.18) 0%, rgba(12,13,13,.42) 45%, rgba(12,13,13,.86) 100%)",
          }}
        />
        <Container className="relative pb-14 pt-28">
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-[34px] h-0.5 bg-accent" />
            <span className="font-poppins text-[11px] font-semibold tracking-[0.22em] uppercase text-accent-pale">
              Sports Board club
            </span>
          </div>
          <h1 className="font-display font-bold text-[clamp(48px,7vw,110px)] leading-[0.9] m-0 uppercase text-white">
            {clubData.name}
          </h1>
        </Container>
      </section>

      {clubData.aboutDesc && (
        <SplitSection
          eyebrow="About the club"
          title="About us"
          image={clubData.aboutusimg}
          background="bg-white"
        >
          {clubData.aboutDesc}
        </SplitSection>
      )}

      {clubData.rules && (
        <SplitSection
          eyebrow="Before you join"
          title="Rules and guidelines"
          image={clubData.rulesimg}
          background="bg-surface"
          flip
        >
          {clubData.rules}
        </SplitSection>
      )}

      <ListSection
        eyebrow="Track record"
        title="Past events"
        image={clubData.pastEventsImg}
        items={clubData.pastEvents || []}
        background="bg-white"
      />

      <ListSection
        eyebrow="Silverware"
        title="Achievements"
        image={clubData.achievementsImg}
        items={clubData.achievements || []}
        background="bg-surface"
      />

      <CarouselSection
        eyebrow="Gallery"
        title="In action"
        images={clubData.galleryImages || []}
        background="bg-white"
      />

      <CarouselSection
        eyebrow="The team"
        title="Club leaders"
        images={clubData.leaderImages || []}
        background="bg-surface"
      />
    </div>
  );
}

export default EachClubPage;
