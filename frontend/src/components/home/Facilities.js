import Container from "../Container";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

export default function Facilities({ facilities = [] }) {
  if (!facilities.length) return null;

  return (
    <section className="bg-white py-20 md:py-[120px]">
      <Container className="grid grid-cols-1 lg:grid-cols-[.8fr_1.2fr] gap-12 lg:gap-20 items-start">
        <Reveal>
          <SectionHeading eyebrow="On campus" title="Facilities" />
          <p className="mt-5 text-base leading-[1.7] text-muted max-w-[34ch]">
            Open through the semester. Equipment is issued at the Old SAC counter against your ID.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="border-t border-line">
          {facilities.map((f, i) => (
            <div
              key={f._id || f.title}
              className="grid grid-cols-[40px_1fr_auto] md:grid-cols-[56px_1fr_auto] items-center gap-4 md:gap-6 py-[22px] px-2 border-b border-line transition-all duration-200 hover:bg-surface hover:pl-4"
            >
              <span className="font-poppins text-xs font-semibold tracking-[0.1em] text-[#B5B5B5]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display font-semibold text-2xl md:text-[30px] tracking-[0.01em] uppercase text-ink">
                {f.title}
              </span>
              <span className="font-poppins text-[11px] font-semibold tracking-[0.14em] uppercase text-accent-deep bg-accent-soft px-3 py-[7px] whitespace-nowrap">
                {f.game}
              </span>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
