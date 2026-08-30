import Container from "../Container";
import Reveal from "../Reveal";

// No backend field carries these two figures; they are editorial constants.
const INTER_IIT_ATHLETES = "40+";
const TOURNAMENTS_PER_YEAR = "12";

export default function StatsBand({ clubCount, facilityCount }) {
  const stats = [
    { value: clubCount ? String(clubCount) : "14", label: "Sports clubs" },
    { value: facilityCount ? String(facilityCount) : "6", label: "Facilities on campus" },
    { value: INTER_IIT_ATHLETES, label: "Inter-IIT athletes" },
    { value: TOURNAMENTS_PER_YEAR, label: "Campus tournaments a year" },
  ];

  return (
    <section className="bg-slate text-white">
      <Container className="grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.06}
            className="bg-slate py-9 pr-7 border-r border-white/[.14] last:border-r-0 flex flex-col gap-1.5"
          >
            <span className="font-display text-[44px] md:text-[56px] font-bold leading-[0.9] text-accent">
              {s.value}
            </span>
            <span className="font-poppins text-xs font-medium tracking-[0.14em] uppercase text-white/70">
              {s.label}
            </span>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
