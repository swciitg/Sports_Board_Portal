import { useHomePageData } from "../hooks/useHomePageData";
import { useAllClubsData } from "../hooks/useAllClubsData";
import HeroSection from "../components/HeroSection";
import Loader from "../components/Loader";
import Errors from "../components/Errors";
import StatsBand from "../components/home/StatsBand";
import About from "../components/home/About";
import ClubsGrid from "../components/home/ClubsGrid";
import Facilities from "../components/home/Facilities";
import Leadership from "../components/home/Leadership";
import Gallery from "../components/home/Gallery";
import JoinCta from "../components/home/JoinCta";

function HomePage() {
  const { data, error, loading } = useHomePageData();
  const { data: clubsData } = useAllClubsData();

  if (loading) return <Loader isOpen message="Loading homepage…" />;

  if (error)
    return (
      <Errors
        status_code={error.status || 500}
        title="Couldn't load the homepage"
        message="The server didn't respond. Nothing is lost — try again in a moment."
        buttonText="Retry"
        onClick={() => window.location.reload()}
      />
    );

  const homepage = data?.homepage?.[0];
  const about = data?.aboutData?.[0];
  const facilities = data?.facilities || [];
  const clubs = clubsData?.club || [];

  return (
    <div className="w-full">
      <HeroSection heroImage={homepage?.heroimage} />
      <StatsBand clubCount={clubs.length} facilityCount={facilities.length} />
      <About image={about?.image} description={about?.description} />
      <ClubsGrid clubs={clubs} />
      <Facilities facilities={facilities} />
      <Leadership homepage={homepage} />
      <Gallery images={homepage?.galleryImages || []} />
      <JoinCta />
    </div>
  );
}

export default HomePage;
