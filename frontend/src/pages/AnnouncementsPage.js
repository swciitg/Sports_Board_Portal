import { motion, AnimatePresence } from "framer-motion";
import { useAnnouncementsPageData } from "../hooks/useAnnouncementsPageData";
import { Loader, AlertCard, Errors } from "../components";
import Container from "../components/Container";
import SectionHeading from "../components/SectionHeading";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const AnnouncementsPage = () => {
  const { data, error, loading } = useAnnouncementsPageData();

  if (loading) return <Loader isOpen message="Loading announcements…" />;

  if (error)
    return (
      <Errors
        status_code={error.status || 500}
        title="Couldn't load announcements"
        message={error.message || "The server didn't respond. Try again in a moment."}
        buttonText="Retry"
        onClick={() => window.location.reload()}
      />
    );

  // The endpoint returns an array; guard against a single object just in case.
  const announcements = Array.isArray(data.announcements)
    ? data.announcements
    : [data.announcements].filter(Boolean);

  return (
    <div className="w-full bg-white py-16 md:py-24">
      <Container>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="pb-8 border-b border-line mb-10"
        >
          <SectionHeading
            eyebrow="Notice board"
            title="Announcements"
            size="text-[clamp(44px,4.8vw,72px)]"
          />
          <p className="mt-4 mb-0 text-[17px] text-muted max-w-[52ch]">
            Stay updated with the latest news and important information.
          </p>
        </motion.div>

        {announcements.length === 0 ? (
          <p className="text-muted">No announcements available at the moment.</p>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <AnimatePresence>
              {announcements.map((announcement, index) => (
                <AlertCard
                  key={`${announcement.title}-${announcement.date}`}
                  announcement={announcement}
                  index={index}
                  variants={itemVariants}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default AnnouncementsPage;
