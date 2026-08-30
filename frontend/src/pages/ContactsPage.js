import React, { useEffect, useState } from "react";
import axios from "axios";
import { LuMail, LuPhone, LuMapPin, LuArrowUpRight, LuIdCard } from "react-icons/lu";
import { IoLogoLinkedin } from "react-icons/io5";
import { useHomePageData } from "../hooks/useHomePageData";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import Loader from "../components/Loader";
import Errors from "../components/Errors";

const BOARD_MAIL = "sportsec@iitg.ac.in";
const BOARD_TEL = "+91-361-258162";

const chip =
  "font-poppins text-[13px] font-medium text-white bg-white/[.14] border border-white/[.28] px-[18px] py-[11px] inline-flex items-center gap-2.5 transition-colors hover:bg-white/[.24]";

const iconButton =
  "w-10 h-10 border border-[#D8D8D8] inline-flex items-center justify-center text-[17px] text-ink bg-white transition-all duration-200 hover:bg-ink hover:text-white hover:border-ink";

function ContactCard({ contact }) {
  const mail = contact?.socialLinks?.mailId;
  const phone = contact?.socialLinks?.phoneNo;
  const linkedin = contact?.socialLinks?.linkedin;

  return (
    <div className="bg-surface flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-22px_rgba(12,13,13,.4)]">
      <div className="relative aspect-square bg-[#ECECEC] overflow-hidden">
        {contact?.image && (
          <img src={contact.image} alt={contact.name} className="w-full h-full object-cover" />
        )}
      </div>
      <div className="px-6 pt-6 pb-[26px] flex flex-col gap-3.5 flex-grow">
        <div className="flex-grow">
          <span className="font-poppins text-[10px] font-semibold tracking-[0.18em] uppercase text-accent-deep">
            {contact?.designation}
          </span>
          <div className="font-display font-bold text-[30px] md:text-[34px] leading-[1.05] uppercase mt-2 text-ink">
            {contact?.name}
          </div>
          <div className="text-[15px] text-muted mt-1">{contact?.department}</div>
          {contact?.description && (
            <div className="font-poppins text-[11px] font-medium tracking-[0.04em] text-subtle mt-2.5 inline-flex items-center gap-1.5 bg-white border border-[#E4E4E4] px-2.5 py-1">
              <LuIdCard className="text-accent-deep shrink-0" />
              {contact.description}
            </div>
          )}
        </div>
        <div className="flex gap-2 pt-1">
          {mail && (
            <a href={`mailto:${mail}`} className={iconButton} aria-label="Email">
              <LuMail />
            </a>
          )}
          {phone && (
            <a href={`tel:${phone}`} className={iconButton} aria-label="Phone">
              <LuPhone />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={iconButton}
              aria-label="LinkedIn"
            >
              <IoLogoLinkedin />
            </a>
          )}
        </div>
        {mail && (
          <div className="font-mono text-[11px] text-subtle border-t border-[#E4E4E4] pt-3 break-all">
            {mail}
          </div>
        )}
      </div>
    </div>
  );
}

function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data } = useHomePageData();
  const heroImage = data?.homepage?.[0]?.contactpageimgurl || "";

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/contacts`);
        setContacts(response.data.contacts || []);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) return <Loader isOpen message="Loading contacts…" />;

  if (error)
    return (
      <Errors
        status_code={error.status || 500}
        title="Couldn't load contacts"
        message="The server didn't respond. Nothing is lost — try again in a moment."
        buttonText="Retry"
        onClick={() => window.location.reload()}
      />
    );

  // A contact carrying a `club` is that club's secretary; the rest are core team.
  const coreTeam = contacts.filter((c) => !c.club);
  const secretaries = contacts.filter((c) => c.club);

  return (
    <div className="w-full">
      {/* Hero */}
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
              Contacts
            </span>
          </div>
          <h1 className="font-display font-bold text-[clamp(44px,6.6vw,104px)] leading-[0.9] m-0 uppercase text-white">
            Get in touch
          </h1>
          <p className="max-w-[50ch] mt-[18px] mb-[26px] text-[17px] leading-[1.6] text-white/80">
            Queries about trials, equipment, tournaments or the Inter&#8209;IIT contingent — reach
            the right person directly.
          </p>
          <div className="flex gap-2.5 flex-wrap">
            <a href={`mailto:${BOARD_MAIL}`} className={chip}>
              <LuMail /> {BOARD_MAIL}
            </a>
            <a href="tel:+91361258162" className={chip}>
              <LuPhone /> {BOARD_TEL}
            </a>
            <span className={chip}>
              <LuMapPin /> Old SAC Building, IIT Guwahati
            </span>
          </div>
        </Container>
      </section>

      {/* Core team */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <Reveal className="flex items-end justify-between gap-10 pb-8 border-b border-line flex-wrap">
            <SectionHeading title="The core team" size="text-[clamp(44px,4.8vw,72px)]" />
            <span className="font-poppins text-xs tracking-[0.14em] uppercase text-subtle pb-2">
              2025–26 tenure
            </span>
          </Reveal>

          {coreTeam.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
              {coreTeam.map((contact, i) => (
                <Reveal key={contact._id || contact.name} delay={(i % 3) * 0.06}>
                  <ContactCard contact={contact} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-10 text-muted">No contacts have been published yet.</p>
          )}
        </Container>
      </section>

      {/* Club secretaries */}
      {secretaries.length > 0 && (
        <section className="bg-surface py-16 md:py-24">
          <Container>
            <Reveal className="mb-9">
              <SectionHeading
                eyebrow="Club-wise"
                title="Club secretaries"
                size="text-[clamp(44px,4.8vw,72px)]"
              />
              <p className="mt-4 mb-0 text-base text-muted max-w-[52ch]">
                For trials, practice timings and equipment, write to the secretary of the club you
                are after.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="bg-white grid grid-cols-1 lg:grid-cols-2">
              {secretaries.map((s) => (
                <div
                  key={s._id || `${s.club}-${s.name}`}
                  className="grid grid-cols-[1fr_auto] items-center gap-4 px-6 py-5 border-b border-[#EDEDED] transition-colors hover:bg-[#F7FBFC]"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-display font-semibold text-2xl tracking-[0.02em] uppercase text-ink">
                      {s.club}
                    </span>
                    <span className="text-[13px] text-muted">
                      {s.name}
                      {s.department ? ` — ${s.department}` : ""}
                    </span>
                  </div>
                  <a
                    href={`mailto:${s.socialLinks?.mailId || BOARD_MAIL}`}
                    className="font-poppins text-xs font-semibold tracking-[0.06em] uppercase text-accent-deep inline-flex items-center gap-2 transition-colors hover:text-ink"
                  >
                    Mail <LuArrowUpRight />
                  </a>
                </div>
              ))}
            </Reveal>
          </Container>
        </section>
      )}
    </div>
  );
}

export default ContactsPage;
