import { motion } from "framer-motion";
import { LuCalendar, LuArrowRight } from "react-icons/lu";

const AlertCard = ({ announcement, index = 0, variants }) => {
  const { title, description, date, link } = announcement;

  return (
    <motion.div
      variants={variants}
      layout
      className="bg-white border border-line overflow-hidden transition-all duration-300 hover:border-accent hover:shadow-[0_18px_34px_-18px_rgba(12,13,13,.25)] group"
    >
      <div className="p-6 sm:p-8">
        <h2 className="font-display font-bold text-[28px] sm:text-[32px] leading-[1.1] uppercase text-ink mb-3 transition-colors duration-200 group-hover:text-accent-deep">
          {title}
        </h2>

        <div className="flex items-center text-subtle mb-4">
          <LuCalendar className="w-4 h-4 mr-2" />
          <span className="font-poppins text-[11px] font-semibold tracking-[0.14em] uppercase">
            {new Date(date).toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        <p className="text-[17px] leading-[1.75] text-muted mb-4 whitespace-pre-line">
          {description}
        </p>

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-poppins text-[13px] font-semibold tracking-[0.04em] text-ink inline-flex items-center gap-2.5 pb-1.5 border-b border-ink transition-all duration-200 hover:gap-4 hover:text-accent-deep hover:border-accent-deep"
          >
            Learn more
            <LuArrowRight className="w-4 h-4" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default AlertCard;
