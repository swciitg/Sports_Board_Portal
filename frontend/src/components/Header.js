import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import sbLogo from "../assets/sports_board_logo.jpg";

const navItems = [
  { name: "Home", slug: "/" },
  { name: "Clubs", slug: "/clubs" },
  { name: "Events", slug: "/events" },
  { name: "Announcements", slug: "/announcements" },
  { name: "Contacts", slug: "/contacts" },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((open) => !open);

  return (
    <header className="sticky top-0 z-50 bg-white/[.92] backdrop-blur-xl backdrop-saturate-150 border-b border-line">
      <div className="w-full max-w-container mx-auto px-6 md:px-10 box-border">
        <nav className="h-[76px] flex items-center justify-between gap-6">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={sbLogo}
              alt="Sports Board IIT Guwahati"
              className="w-[40px] h-[44px] md:w-[46px] md:h-[50px] object-contain"
            />
            <span className="flex flex-col leading-[1.05]">
              <span className="font-display font-bold text-lg md:text-[22px] tracking-[0.04em] text-ink">
                SPORTS BOARD
              </span>
              <span className="font-poppins font-medium text-[10px] md:text-[11px] tracking-[0.16em] uppercase text-subtle">
                IIT Guwahati
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1 font-poppins text-sm font-medium">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.slug}
                end={item.slug === "/"}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-ink bg-accent-soft"
                      : "text-muted hover:text-ink hover:bg-[#F2F2F2]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <Link
              to="/contacts"
              className="ml-3 px-[18px] py-2.5 rounded-full bg-ink text-white font-semibold transition-all duration-200 hover:bg-accent-deep"
            >
              Join a club
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-ink"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <RxCross2 size={24} /> : <IoMenu size={24} />}
          </button>
        </nav>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-screen pb-4" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col gap-2 pt-2 font-poppins text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.slug}
                  end={item.slug === "/"}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block w-full px-4 py-3 transition-colors duration-200 ${
                      isActive
                        ? "text-ink bg-accent-soft"
                        : "text-muted bg-surface hover:text-ink"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li>
              <Link
                to="/contacts"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full px-4 py-3 bg-ink text-white font-semibold text-center"
              >
                Join a club
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
