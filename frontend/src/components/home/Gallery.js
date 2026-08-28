import { IoLogoInstagram } from "react-icons/io5";
import Container from "../Container";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

/**
 * Horizontal snap rail fed by homepage[0].galleryImages.
 * Renders nothing until an editor adds images in AdminJS.
 */
export default function Gallery({ images = [] }) {
  if (!images.length) return null;

  return (
    <section className="bg-white pt-20 md:pt-[110px] pb-20 md:pb-[120px]">
      <Container className="flex items-end justify-between gap-10 mb-8 flex-wrap">
        <Reveal>
          <SectionHeading eyebrow="Gallery" title="This season, so far" />
        </Reveal>
        <a
          href="https://www.instagram.com/sports_iit_guwahati/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-poppins text-[13px] font-semibold text-ink inline-flex items-center gap-2.5 pb-1.5 border-b border-ink transition-colors hover:text-accent-deep hover:border-accent-deep"
        >
          More on Instagram <IoLogoInstagram />
        </a>
      </Container>

      <div className="flex gap-4 overflow-x-auto px-6 md:px-10 pb-3 snap-x snap-mandatory">
        {images.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="shrink-0 w-[300px] md:w-[380px] h-[220px] md:h-[250px] bg-surface snap-start overflow-hidden"
          >
            <img
              src={src}
              alt={`Sports Board gallery ${i + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
