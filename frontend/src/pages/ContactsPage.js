import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RoundedDiv from "../components/RoundedDiv";
import { FaPhone } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { IoLogoLinkedin } from "react-icons/io5";
import axios from "axios"; // To make API calls
import { useHomePageData } from "../hooks/useHomePageData";

function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {data } = useHomePageData();
  const imgdata = data?.homepage[0]?.contactpageimgurl || [];
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

  // if (loading) return <p className="text-center">Loading...</p>;
  // if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <Header />
      <div className="overflow-hidden opa font-poppins flex flex-col">
        <div
          className="w-full h-[865px] bg-top bg-cover bg-no-repeat flex flex-col items-center justify-center gap-5 text-gray-200"
          style={{ backgroundImage: `url(${imgdata})` }}
        >
          <p className="text-4xl md:text-7xl font-semibold tracking-tight text-center">
            GET IN TOUCH
          </p>
          <p className="text-sm sm:text-base md:text-lg tracking-tight text-center">
            In case you have any queries, don’t hesitate to reach out to us.
          </p>
        </div>

        {contacts?.map((contact, index) => (
          <RoundedDiv
            key={index}
            Element={() => (
              <div className="w-full flex flex-col-reverse gap-5 md:flex-row md:justify-between md:items-start px-10 md:px-20 pb-[15vw] pt-[10vw]">
                <div className="w-full md:w-[50%] text-center md:text-left flex flex-col items-center md:items-start justify-start space-y-1">
                  <h1 className="text-[5vw] leading-none font-semibold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
                    {contact.designation.toUpperCase()}
                  </h1>
                  <p className="text-[3vw] md:text-[2vw] leading-relaxed text-[#565656] font-[Familjen Grotesk]">
                    {contact.name} <br /> {contact.department}
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-[#565656] font-[Familjen Grotesk]">
                    {contact.description}
                  </p>
                  <div className="pt-[2vw] flex gap-[5vw] text-black text-[10vw] md:text-[3vw]">
                    {contact.socialLinks.phoneNo && (
                      <a href={`tel:${contact.socialLinks.phoneNo}`}>
                        <FaPhone className="cursor-pointer hover:text-[#141414]" />
                      </a>
                    )}
                    {contact.socialLinks.mailId && (
                      <a href={`mailto:${contact.socialLinks.mailId}`}>
                        <MdMail className="cursor-pointer hover:text-[#141414]" />
                      </a>
                    )}
                    {contact.socialLinks.linkedin && (
                      <a
                        href={contact.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IoLogoLinkedin className="cursor-pointer hover:text-[#141414]" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="w-full md:w-[50%] flex items-center justify-center">
                  <img
                    src={contact.image}
                    alt={contact.name}
                    className="w-[70%] object-cover"
                  />
                </div>
              </div>
            )}
            bg={index % 2 === 0 ? "#F5F5F5" : "#7BB9C4"}
            top="-200px"
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ContactsPage;
