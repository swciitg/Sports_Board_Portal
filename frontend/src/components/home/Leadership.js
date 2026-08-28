import Container from "../Container";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

function LeaderCard({ role, name, department, quote, image, messageLabel }) {
  return (
    <div className="bg-white p-6 md:p-8 flex flex-col gap-6">
      <div className="flex gap-6 items-start">
        <div className="relative shrink-0">
          <div className="absolute left-3 top-3 w-full h-full bg-accent" />
          <div className="relative w-[120px] h-[150px] md:w-[150px] md:h-[186px] bg-surface overflow-hidden">
            {image && <img src={image} alt={name} className="w-full h-full object-cover" />}
          </div>
        </div>
        <div className="pt-1.5">
          <span className="font-poppins text-[11px] font-semibold tracking-[0.18em] uppercase text-accent-deep">
            {role}
          </span>
          <div className="font-display font-bold text-3xl md:text-[38px] leading-[1.05] uppercase mt-2.5 text-ink">
            {name}
          </div>
          <div className="text-[15px] text-muted mt-1.5">{department}</div>
        </div>
      </div>
      <div className="border-t border-[#EDEDED] pt-[22px]">
        <div className="font-poppins text-[11px] font-semibold tracking-[0.16em] uppercase text-subtle mb-3">
          {messageLabel}
        </div>
        <p className="font-display font-semibold text-2xl md:text-[32px] leading-[1.1] text-ink m-0">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
    </div>
  );
}

export default function Leadership({ homepage }) {
  if (!homepage) return null;

  const leaders = [
    {
      role: "Chairman",
      name: homepage.chairmanname,
      department: homepage.chairmandescription,
      quote: homepage.aboutchairman,
      image: homepage.chairmanimgurl,
      messageLabel: "Message from the Chairman",
    },
    {
      role: "General Secretary",
      name: homepage.gensecname,
      department: homepage.gensecdescription,
      quote: homepage.aboutgensec,
      image: homepage.gensecimg,
      messageLabel: "Message from the General Secretary",
    },
  ].filter((l) => l.name);

  if (!leaders.length) return null;

  return (
    <section className="bg-surface py-20 md:py-[110px]">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Leadership" title="Messages from the board" className="mb-12" />
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {leaders.map((leader, i) => (
            <Reveal key={leader.role} delay={i * 0.08}>
              <LeaderCard {...leader} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
