import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEventPageData } from "../hooks/useEventPageData";
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

function EventSection({ event, index }) {
  const gallery = event.galleryImages || [];
  const background = index % 2 === 0 ? "bg-white" : "bg-surface";

  return (
    <section className={`${background} py-16 md:py-24`}>
      <Container>
        <Reveal className="pb-8 border-b border-line">
          <SectionHeading
            eyebrow={`Event ${String(index + 1).padStart(2, "0")}`}
            title={event.eventName}
            size="text-[clamp(40px,4.8vw,72px)]"
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mt-10">
          <Reveal>
            {gallery.length ? (
              <Carousel {...carouselProps}>
                {gallery.map((src, i) => (
                  <div key={`${src}-${i}`} className="aspect-[4/3] bg-surface overflow-hidden">
                    <img
                      src={src}
                      alt={`${event.eventName} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </Carousel>
            ) : (
              event.frontImage && (
                <div className="aspect-[4/3] bg-surface overflow-hidden">
                  <img
                    src={event.frontImage}
                    alt={event.eventName}
                    className="w-full h-full object-cover"
                  />
                </div>
              )
            )}
          </Reveal>

          <Reveal delay={0.1}>
            {event.eventIntroDesc && (
              <p className="text-[17px] leading-[1.75] text-muted max-w-[56ch] whitespace-pre-line m-0">
                {event.eventIntroDesc}
              </p>
            )}
            {event.eventActivityDesc && (
              <p className="mt-4 text-[17px] leading-[1.75] text-muted max-w-[56ch] whitespace-pre-line">
                {event.eventActivityDesc}
              </p>
            )}

            {(event.milestones || []).length > 0 && (
              <div className="mt-8 pt-7 border-t border-line">
                <div className="font-poppins text-[11px] font-semibold tracking-[0.16em] uppercase text-subtle mb-3">
                  Milestones
                </div>
                <ul className="flex flex-col gap-2 m-0 p-0 list-none">
                  {event.milestones.map((m, i) => (
                    <li key={`${m}-${i}`} className="text-base text-ink">
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function EachEventPage() {
  const { data, error, loading } = useEventPageData();

  if (loading) return <Loader isOpen message="Loading events…" />;

  if (error)
    return (
      <Errors
        status_code={error.status || 500}
        title="Couldn't load the events"
        message="The server didn't respond. Nothing is lost — try again in a moment."
        buttonText="Retry"
        onClick={() => window.location.reload()}
      />
    );

  const events = data?.events || [];
  const heroImage = data?.homepage?.[0]?.eventimgurl || "";
  const boardName = data?.homepage?.[0]?.boardname || "Sports Board";

  return (
    <div className="w-full">
      <section
        className="relative min-h-[380px] md:min-h-[460px] flex items-end overflow-hidden bg-slate bg-cover bg-top bg-no-repeat"
        style={heroImage ? { backgroundImage: `url(${heroImage})` } : undefined}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,13,13,.18) 0%, rgba(12,13,13,.42) 45%, rgba(12,13,13,.85) 100%)",
          }}
        />
        <Container className="relative pb-14 pt-28">
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-[34px] h-0.5 bg-accent" />
            <span className="font-poppins text-[11px] font-semibold tracking-[0.22em] uppercase text-accent-pale">
              {boardName}
            </span>
          </div>
          <h1 className="font-display font-bold text-[clamp(44px,6.6vw,104px)] leading-[0.9] m-0 uppercase text-white">
            Events
          </h1>
          <p className="max-w-[50ch] mt-[18px] mb-0 text-[17px] leading-[1.6] text-white/80">
            Tournaments, meets and fests run by the board through the year.
          </p>
        </Container>
      </section>

      {events.length ? (
        events.map((event, index) => (
          <EventSection key={event._id || event.eventName} event={event} index={index} />
        ))
      ) : (
        <section className="bg-white py-16 md:py-24">
          <Container>
            <p className="text-muted">No events have been published yet.</p>
          </Container>
        </section>
      )}
    </div>
  );
}

export default EachEventPage;
