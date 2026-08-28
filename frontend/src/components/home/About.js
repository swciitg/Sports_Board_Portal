import Container from "../Container";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

export default function About({ image, description }) {
  return (
    <section className="bg-white py-20 md:py-[120px]">
      <Container className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-20 items-center">
        <Reveal className="relative">
          <div className="absolute -left-[22px] -top-[22px] w-[180px] h-[180px] bg-accent z-0" />
          <div className="relative z-[1] aspect-[4/5] bg-surface overflow-hidden">
            {image && (
              <img src={image} alt="Sport on campus" className="w-full h-full object-cover" />
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <SectionHeading eyebrow="About us" title="A club for every sport" />
          <p className="mt-6 mb-0 text-[17px] leading-[1.75] text-muted max-w-[56ch]">
            {description}
          </p>
          <div className="flex gap-10 mt-9 pt-7 border-t border-line">
            <div>
              <div className="font-poppins text-[11px] font-semibold tracking-[0.16em] uppercase text-subtle mb-1.5">
                Open to
              </div>
              <div className="text-base text-ink">Every student, every year</div>
            </div>
            <div>
              <div className="font-poppins text-[11px] font-semibold tracking-[0.16em] uppercase text-subtle mb-1.5">
                Office
              </div>
              <div className="text-base text-ink">Old SAC Building</div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
