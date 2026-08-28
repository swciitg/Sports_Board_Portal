// Footer.js
import React from "react";
import { Link } from "react-router-dom";
import { IoLogoInstagram } from "react-icons/io5";
import { BsYoutube } from "react-icons/bs";
import sbLogo from "../assets/sports_board_logo.jpg";
import swcLogo from "../assets/swc_logo.jpg";
import { useAllClubsData, clubSlug } from "../hooks/useAllClubsData";

const socialUrls = {
  instagram: "https://www.instagram.com/sports_iit_guwahati/",
  youtube: "https://www.youtube.com/@sportsboardiitguwahati",
};

const exploreLinks = [
  { name: "Home", slug: "/" },
  { name: "Clubs", slug: "/clubs" },
  { name: "Events", slug: "/events" },
  { name: "Announcements", slug: "/announcements" },
  { name: "Contacts", slug: "/contacts" },
];

const columnLabel =
  "font-poppins text-[11px] font-semibold tracking-[0.18em] uppercase text-white/50 mb-[18px]";

function Footer() {
  // Layout renders the footer once for the whole app, so this is a single request.
  const { data } = useAllClubsData();
  const clubs = (data?.club || []).slice(0, 5);

  return (
    <footer className="w-full bg-slate text-white font-body">
      <div className="w-full max-w-container mx-auto px-6 md:px-10 pt-16 pb-7 box-border grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr]">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3.5 mb-[22px]">
            <img
              src={sbLogo}
              alt="Sports Board IIT Guwahati"
              className="w-[56px] h-[60px] object-contain bg-white rounded-lg p-0.5"
            />
            <span className="flex flex-col leading-[1.1]">
              <span className="font-display font-bold text-2xl tracking-[0.03em]">
                SPORTS BOARD
              </span>
              <span className="font-poppins text-[11px] font-medium tracking-[0.16em] uppercase text-white/60">
                IIT Guwahati
              </span>
            </span>
          </div>
          <div className="text-[15px] leading-[1.9] text-white/70">
            <div>Old SAC Building, IIT Guwahati</div>
            <div>Guwahati, Assam — 781039</div>
            <a href="tel:+91361258162" className="text-white/70 hover:text-accent transition-colors">
              +91-361-258162
            </a>
            <br />
            <a
              href="mailto:sportsec@iitg.ac.in"
              className="text-white/70 hover:text-accent transition-colors"
            >
              sportsec@iitg.ac.in
            </a>
          </div>
        </div>

        {/* Explore */}
        <div>
          <div className={columnLabel}>Explore</div>
          <div className="flex flex-col gap-[11px] text-[15px]">
            {exploreLinks.map((item) => (
              <Link
                key={item.name}
                to={item.slug}
                className="text-white/80 hover:text-accent transition-colors w-fit"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Clubs */}
        {clubs.length > 0 && (
          <div>
            <div className={columnLabel}>Clubs</div>
            <div className="flex flex-col gap-[11px] text-[15px]">
              {clubs.map((club) => (
                <Link
                  key={club._id || club.name}
                  to={`/club/${clubSlug(club)}`}
                  className="text-white/80 hover:text-accent transition-colors w-fit"
                >
                  {club.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Follow + SWC */}
        <div className="flex flex-col gap-6">
          <div>
            <div className={columnLabel}>Follow</div>
            <div className="flex gap-2.5">
              <a
                href={socialUrls.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 border border-white/[.28] inline-flex items-center justify-center text-xl text-white transition-colors duration-200 hover:bg-[#cd486b] hover:border-[#cd486b]"
              >
                <IoLogoInstagram />
              </a>
              <a
                href={socialUrls.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-11 h-11 border border-white/[.28] inline-flex items-center justify-center text-xl text-white transition-colors duration-200 hover:bg-[#FF0000] hover:border-[#FF0000]"
              >
                <BsYoutube />
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <img
              src={swcLogo}
              alt="Students' Web Committee IITG"
              className="h-11 w-11 rounded-full object-cover outline outline-1 outline-white/50"
            />
            <div className="text-[13px] leading-[1.5] text-white/70">
              Maintained by Students'
              <br />
              Web Committee, IITG
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-container mx-auto px-6 md:px-10 pt-5 pb-[30px] box-border border-t border-white/[.12] flex items-center justify-between gap-6 flex-wrap">
        <span className="text-[13px] text-white/55">&copy; SPORTS BOARD, IIT Guwahati</span>
        <span className="font-poppins text-[11px] tracking-[0.14em] uppercase text-white/40">
          Play for the institute
        </span>
      </div>
    </footer>
  );
}

export default Footer;
