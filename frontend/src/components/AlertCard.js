import { motion } from "framer-motion";
import { LuCalendar, LuArrowRight } from "react-icons/lu";

const AlertCard = ({ announcement, index = 0, variants }) => {
  const { title, description, date, link } = announcement;

  return (
    <motion.div
        key={announcement.id || index}
        variants={variants}
        layout
        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 group"
    >
      <div className="p-6 sm:p-8">
        {/* Title */}
        <motion.h2
          className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200"
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.h2>

        {/* Date */}
        <div className="flex items-center text-gray-500 mb-4">
          <LuCalendar className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long",
            })}
          </span>
        </div>

        {/* Description */}
        <motion.p
          className="text-gray-700 leading-relaxed mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 + index * 0.1 }}
        >
          {description}
        </motion.p>

        {/* Optional Link */}
        {link && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200 group/link"
            >
              <span className="mr-2">Learn more</span>
              <div className="flex items-center">
                <LuArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-200" />
              </div>
            </a>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AlertCard;
