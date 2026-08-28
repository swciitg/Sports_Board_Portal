import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import Container from "../Container";
import Reveal from "../Reveal";

export default function JoinCta() {
  return (
    <section className="bg-accent py-16 md:py-[84px]">
      <Reveal>
        <Container className="flex items-center justify-between gap-12 flex-wrap">
          <div>
            <h2 className="font-display font-bold text-[clamp(40px,4.4vw,66px)] leading-[0.95] m-0 uppercase text-ink">
              Trials are open
              <br />
              every semester
            </h2>
            <p className="mt-4 mb-0 text-[17px] text-[#123C43] max-w-[46ch]">
              Turn up at the Old SAC counter, or write to the general secretary — no prior
              experience needed for most clubs.
            </p>
          </div>
          <Link
            to="/contacts"
            className="font-poppins text-sm font-semibold px-[30px] py-[17px] bg-ink text-white inline-flex items-center gap-3 transition-all duration-200 hover:gap-[18px] hover:bg-white hover:text-ink"
          >
            Get in touch <LuArrowRight />
          </Link>
        </Container>
      </Reveal>
    </section>
  );
}
