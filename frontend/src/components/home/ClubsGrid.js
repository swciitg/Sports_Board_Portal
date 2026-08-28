import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import Container from "../Container";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import ClubCard from "../ClubCard";

export default function ClubsGrid({ clubs = [] }) {
  if (!clubs.length) return null;

  return (
    <section className="bg-surface py-20 md:py-[110px]">
      <Container>
        <Reveal className="flex items-end justify-between gap-10 pb-9 border-b border-[#DEDEDE] flex-wrap">
          <SectionHeading eyebrow="The clubs" title="Pick your sport" />
          <Link
            to="/clubs"
            className="font-poppins text-[13px] font-semibold tracking-[0.04em] text-ink inline-flex items-center gap-2.5 pb-1.5 border-b border-ink transition-all duration-200 hover:gap-4 hover:text-accent-deep hover:border-accent-deep"
          >
            All {clubs.length} clubs <LuArrowRight />
          </Link>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-9">
          {clubs.slice(0, 8).map((club, i) => (
            <Reveal key={club._id || club.name} delay={(i % 4) * 0.06}>
              <ClubCard index={i} clubData={club} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
