import { Link } from "react-router-dom";
import { LuArrowUpRight } from "react-icons/lu";
import { clubSlug } from "../hooks/useAllClubsData";

/**
 * Club card: numbered 4:3 image plate with the club name below.
 * Used by the homepage clubs grid and the all-clubs page.
 */
export default function ClubCard({ index = 0, clubData }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <Link
      to={`/club/${clubSlug(clubData)}`}
      className="group block bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_-18px_rgba(12,13,13,.35)]"
    >
      <div className="relative aspect-[4/3] bg-surface overflow-hidden">
        {clubData?.img && (
          <img
            src={clubData.img}
            alt={clubData.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute top-2.5 left-2.5 px-1.5 py-0.5 bg-ink/70 font-display font-bold text-[15px] tracking-[0.06em] text-white">
          {num}
        </span>
      </div>
      <div className="px-4 pt-4 pb-[18px] flex items-center justify-between gap-2">
        <span className="font-display font-semibold text-2xl tracking-[0.02em] uppercase text-ink">
          {clubData?.name}
        </span>
        <LuArrowUpRight className="text-lg text-accent shrink-0" />
      </div>
    </Link>
  );
}
