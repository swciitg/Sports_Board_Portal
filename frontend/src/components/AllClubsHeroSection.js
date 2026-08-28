import { useAllClubsData } from "../hooks/useAllClubsData";
import Container from "./Container";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ClubCard from "./ClubCard";
import Loader from "./Loader";
import Errors from "./Errors";

function AllClubsHeroSection() {
  const { data, error, loading } = useAllClubsData();

  if (loading) return <Loader isOpen message="Loading clubs…" />;

  if (error)
    return (
      <Errors
        status_code={error.status || 500}
        title="Couldn't load the clubs"
        message="The server didn't respond. Nothing is lost — try again in a moment."
        buttonText="Retry"
        onClick={() => window.location.reload()}
      />
    );

  const clubs = data?.club || [];
  const heroImage = data?.homepage?.[0]?.clubheroimg || "";

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
              The clubs
            </span>
          </div>
          <h1 className="font-display font-bold text-[clamp(44px,6.6vw,104px)] leading-[0.9] m-0 uppercase text-white">
            Pick your sport
          </h1>
          <p className="max-w-[52ch] mt-[18px] mb-0 text-[17px] leading-[1.6] text-white/80">
            Every sport on campus has a club behind it, and most of them take you in with no prior
            experience. Trials open each semester.
          </p>
        </Container>
      </section>

      <section className="bg-surface py-16 md:py-24">
        <Container>
          <Reveal className="pb-9 border-b border-[#DEDEDE]">
            <SectionHeading
              eyebrow={`${clubs.length} clubs`}
              title="All clubs"
              size="text-[clamp(44px,4.8vw,72px)]"
            />
          </Reveal>

          {clubs.length ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-9">
              {clubs.map((club, i) => (
                <Reveal key={club._id || club.name} delay={(i % 4) * 0.06}>
                  <ClubCard index={i} clubData={club} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-9 text-muted">No clubs have been published yet.</p>
          )}
        </Container>
      </section>
    </div>
  );
}

export default AllClubsHeroSection;
