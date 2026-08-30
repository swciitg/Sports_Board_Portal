import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import Container from "./Container";

/**
 * Home hero band. Full-bleed photo from homepage[0].heroimage under a dark scrim.
 */
export default function HeroSection({ heroImage }) {
  return (
    <section
      className="relative min-h-[520px] md:min-h-[640px] flex items-end overflow-hidden bg-slate bg-cover bg-top bg-no-repeat"
      style={heroImage ? { backgroundImage: `url(${heroImage})` } : undefined}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(12,13,13,.15) 0%, rgba(12,13,13,.35) 45%, rgba(12,13,13,.86) 100%)",
        }}
      />
      <Container className="relative pb-14 md:pb-16 pt-32">
        <div className="flex items-center gap-3 mb-[18px]">
          <span className="block w-[34px] h-0.5 bg-accent" />
          <span className="font-poppins text-[11px] font-semibold tracking-[0.22em] uppercase text-accent-pale">
            Students' Sports Board
          </span>
        </div>
        <h1 className="font-display font-bold text-[clamp(48px,7.6vw,124px)] leading-[0.88] tracking-tight text-white m-0 uppercase max-w-[15ch]">
          Sports Board
          <br />
          IIT Guwahati
        </h1>
        <p className="max-w-[52ch] mt-[22px] mb-0 text-base md:text-lg leading-relaxed text-white/80">
          Fourteen clubs, six facilities and one board that keeps the campus moving, from the
          6&nbsp;a.m. track sessions to the Inter&#8209;IIT podium.
        </p>
        <div className="flex gap-3.5 mt-[34px] flex-wrap">
          <Link
            to="/clubs"
            className="font-poppins text-sm font-semibold px-7 py-[15px] bg-accent text-ink inline-flex items-center gap-2.5 transition-all duration-200 hover:bg-white"
          >
            Explore the clubs <LuArrowRight />
          </Link>
          <Link
            to="/events"
            className="font-poppins text-sm font-semibold px-7 py-[15px] border border-white/45 text-white inline-flex items-center gap-2.5 transition-all duration-200 hover:bg-white/10 hover:border-white"
          >
            Upcoming events
          </Link>
        </div>
      </Container>
    </section>
  );
}
