import useRoundedStyle from "../hooks/useRoundedStyle";
import { useHomePageData } from "../hooks/useHomePageData";
import { Errors, Loader } from './index';
import { LuAlertCircle } from "react-icons/lu";

function HeroSection() {
  const roundedStyle = useRoundedStyle();
  const { data, error, loading } = useHomePageData();
// console.log("data", data);

  // if (loading) return <div>Loading...</div>; // Display loading state
  // if (error) return <div>Error fetching homepage data.</div>; // Handle errors

  if (loading) {
    return <Loader isOpen={true} message="Loading Homepage..." />
  }
  if (error) {
    return (
        <>
        <div className="w-full flex flex-col justify-center items-center px-2 py-10 sm:px-5 md:px-10 lg:px-15 xl:px-22 space-y-6">
           <LuAlertCircle className="w-16 h-16 text-red-500" />
          <Errors
          status_code={error.status ||500}
          title='Error Loading Homepage'
          onClick={() => window.location.reload()}
          message={error.message || 'Failed to load landing page. Please try again later.'}
          buttonText="Retry"
          />
        </div>
        </>
    );
    }

  const teamMember = data ? data.teamMember : [];


  return (
    <div className="w-full overflow-x-hidden font-poppins flex flex-col items-center">
      <div
        className="w-full h-[865px] bg-top bg-cover bg-no-repeat flex flex-col items-center justify-center gap-5 text-gray-200 sticky top-0 z-0"
        style={{ backgroundImage: `url(${data?.homepage[0]?.heroimage})` }}
      >
        <p className="text-4xl md:text-7xl font-semibold tracking-tight text-center">
          SPORTS BOARD IIT GUWAHATI
        </p>
      </div>
      {/* 2nd div */}
      <div
        style={roundedStyle}
        className="top-[-100px] w-full h-[975px] flex items-center justify-center bg-[#F5F5F5] text-center "
      >
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-8">
          {/* Image Section */}
          <div className="w-[460px] h-[470px] basis-1/2">
            <img
              src={data?.aboutData[0]?.image}
              alt="Sports activity"
              className="w-[460px] h-[470px] object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="text-left basis-1/2">
            {/* Title */}
            <h1 className="text-[#0C0D0D] font-semibold text-[96px] leading-none font-[Fira Sans Extra Condensed]">
              ABOUT US<span className="text-[#7BB9C4]">.</span>
            </h1>

            {/* Paragraph */}
            <p className="text-[#565656] text-[15px] leading-relaxed font-[Familjen Grotesk]">
            {data?.aboutData[0]?.description}
               </p>
          </div>
        </div>
      </div>


      <div
        className="top-[-20rem] bg-[#7BB9C4] w-full flex flex-col md:flex-row md:justify-between md:items-start px-10 md:px-20 pb-[115vw] xs:pb-[80vw] sm:pb-[57vw] md:pb-[40vw] lg:pb-[30vw] xl:pb-[22vw]"
        style={roundedStyle}
      >
        {/* Text Section */}
        <div className="md:ml-10 mt-20 w-full md:w-[30%] text-center md:text-left flex flex-col items-center md:items-start space-y-1">
          <h1 className="mb-10 text-[6vw] leading-none font-semibold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
            Team Members<span className="text-[#fff]">.</span>
          </h1>
        </div>

        {/* Image Section */}
        <div className="md:d mt-20 mb-[10rem] w-[825px] h-[690px] grid-cols-3 grid-rows-2 gap-4 overflow-hidden lg:w-[825px] lg:h-[690px] lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-4 hidden md:grid">
          {/* For Laptop */}
          {teamMember && teamMember.map((member, index) => (
            <div key={index} className="w-[240px] h-[330px]">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* For Mobile Phones */}
        <div className="mt-20 mb-[10rem] w-full h-[330px] gap-4 flex overflow-x-scroll scrollbar-thin lg:hidden">
          {teamMember && teamMember.map((member, index) => (
            <div key={index} className="w-[240px] h-[330px] flex-shrink-0">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      {/* {Last div} */}
      <div
        className="top-[-25rem] space-y-8 pb-[83vw] xs:pb-[60vw] sm:pb-[40vw] md:pb-[15vw] lg:pb-[13vw] hidden md:block"
        style={roundedStyle}
      >
        {/* Section 1 - Chairman */}
        <div className="mt-[10rem] w-full flex flex-col md:flex-row md:justify-between md:items-start px-10 md:px-20 md:py-20 relative">
          {/* Background div behind the image */}
          <div
            className="absolute bg-[#7BB9C4]"
            style={{
              width: "455px",
              height: "602px",
              top: 0,
              left: 0,
            }}
          />

          {/* Image Section */}
          <div className="z-10 w-full md:w-[50%] flex items-center justify-center">
            <img
              src={data?.homepage[0]?.chairmanimgurl}
              alt="Chairman"
              className="w-[461px] h-[438px] object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="w-full md:w-[50%] text-center md:text-left flex flex-col items-center md:items-start justify-start space-y-1">
            {/* Title */}
            <h1 className="text-[6vw] leading-none font-semibold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
              CHAIRMAN<span className="text-[#7BB9C4]">.</span>
            </h1>
            <p className="text-[3vw] md:text-[2vw] leading-relaxed text-[#565656] font-[Familjen Grotesk]">
              {data?.homepage[0]?.chairmanname}
            </p>
            <p className="text-[3vw] md:text-[2vw] leading-relaxed text-[#565656] font-[Familjen Grotesk]">
              {data?.homepage[0]?.chairmandescription}
            </p>
            <h2 className="text-[4vw] leading-none font-semibold text-[#565656] font-[Familjen Grotesk] mt-4">
              Message from the Chairman-
            </h2>
            <p className="text-[3vw] md:text-[2vw] leading-relaxed text-[#565656] font-[Familjen Grotesk]">
              {data?.homepage[0]?.aboutchairman}
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start px-10 md:px-20 md:py-20 relative">
          {/* Text Section */}
          <div className="w-full md:w-[50%] text-center md:text-left flex flex-col items-center md:items-start justify-start space-y-1">
            {/* Title */}
            <h1 className="text-[6vw] leading-none font-semibold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
              GENERAL SECRETARY<span className="text-[#7BB9C4]">.</span>
            </h1>
            <p className="text-[3vw] md:text-[2vw] leading-relaxed text-[#565656] font-[Familjen Grotesk]">
              {data?.homepage[0]?.gensecname}
            </p>
            <p className="text-[3vw] md:text-[2vw] leading-relaxed text-[#565656] font-[Familjen Grotesk]">
              {data?.homepage[0]?.gensecdescription}
            </p>
            <h2 className="text-[4vw] leading-none font-semibold text-[#565656] font-[Familjen Grotesk] mt-4">
              Message from the Chairman-
            </h2>
            <p className="text-[3vw] md:text-[2vw] leading-relaxed text-[#565656] font-[Familjen Grotesk]">
              {data?.homepage[0]?.aboutgensec}
            </p>
          </div>

          {/* Background div behind the image */}
          <div
            className="absolute bg-[#7BB9C4]"
            style={{
              width: "455px",
              height: "602px",
              top: 0,
              right: 0,
            }}
          />

          {/* Image Section */}
          <div className="z-10 w-full md:w-[50%] flex items-center justify-center">
            <img
              src={data?.homepage[0]?.gensecimg}
              alt="Chairman"
              className="w-[461px] h-[438px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
