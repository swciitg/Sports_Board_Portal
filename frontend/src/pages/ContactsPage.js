import React, { useEffect, useState } from "react";
import { FaPhone } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { IoLogoLinkedin } from "react-icons/io5";
import axios from "axios"; // To make API calls
import { useHomePageData } from "../hooks/useHomePageData";
import { Loader, RoundedDiv } from "../components";

function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data } = useHomePageData();
  const imgdata = data?.homepage[0]?.contactpageimgurl || "";

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/contacts`);
        setContacts(response.data.contacts);
        setLoading(false);
      } catch (err) {
        setError("Failed to load contacts.");
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
      return <Loader isOpen={true} message="Loading Contacts..." />
  }

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen">
      <div className="overflow-hidden font-poppins flex flex-col">
        {/* Hero Section */}
        <div
          className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[865px] bg-center bg-cover bg-no-repeat flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-5 text-gray-200 px-4"
          style={{ backgroundImage: `url(${imgdata})` }}
        >
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-center leading-tight">
            GET IN TOUCH
          </p>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg tracking-tight text-center max-w-2xl px-4">
            In case you have any queries, don't hesitate to reach out to us.
          </p>
        </div>

        {/* Contact Cards */}
        {contacts?.map((contact, index) => (
          <RoundedDiv
            key={index}
            Element={() => (
              <div className="w-full flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20">
                {/* Text Content */}
                <div className="w-full lg:w-[50%] text-center lg:text-left flex flex-col items-center lg:items-start justify-center space-y-3 sm:space-y-4">
                  {/* Designation */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight font-semibold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
                    {contact.designation.toUpperCase()}
                  </h1>

                  {/* Name and Department */}
                  <div className="space-y-1">
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-[#565656] font-[Familjen Grotesk]">
                      {contact.name}
                    </p>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#565656] font-[Familjen Grotesk]">
                      {contact.department}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-[#565656] font-[Familjen Grotesk] max-w-xl">
                    {contact.description}
                  </p>

                  {/* Social Links */}
                  <div className="pt-4 sm:pt-6 flex gap-4 sm:gap-6 md:gap-8 text-black">
                    {contact.socialLinks?.phoneNo && (
                      <a
                        href={`tel:${contact.socialLinks.phoneNo}`}
                        className="transition-transform hover:scale-110"
                        aria-label="Phone"
                      >
                        <FaPhone className="cursor-pointer hover:text-[#141414] text-2xl sm:text-3xl md:text-4xl" />
                      </a>
                    )}
                    {contact.socialLinks?.mailId && (
                      <a
                        href={`mailto:${contact.socialLinks.mailId}`}
                        className="transition-transform hover:scale-110"
                        aria-label="Email"
                      >
                        <MdMail className="cursor-pointer hover:text-[#141414] text-2xl sm:text-3xl md:text-4xl" />
                      </a>
                    )}
                    {contact.socialLinks?.linkedin && (
                      <a
                        href={contact.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-transform hover:scale-110"
                        aria-label="LinkedIn"
                      >
                        <IoLogoLinkedin className="cursor-pointer hover:text-[#141414] text-2xl sm:text-3xl md:text-4xl" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Image */}
                <div className="w-full lg:w-[50%] flex items-center justify-center">
                  <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] xl:max-w-[450px] aspect-square">
                    <img
                      src={contact.image}
                      alt={contact.name}
                      className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </div>
            )}
            bg={index % 2 === 0 ? "#F5F5F5" : "#7BB9C4"}
            top={index === 0 ? "-80px" : "-60px"}
          />
        ))}
      </div>
    </div>
  );
}

export default ContactsPage;