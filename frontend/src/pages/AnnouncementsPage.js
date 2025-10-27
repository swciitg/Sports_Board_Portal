import { motion, AnimatePresence } from 'framer-motion';
import { LuAlertCircle } from 'react-icons/lu';
import { useAnnouncementsPageData } from '../hooks/useAnnouncementsPageData';
import { Loader, AlertCard, Errors } from '../components';

const AnnouncementsPage = () => {
  const { data, error, loading } = useAnnouncementsPageData();

  // Animation variants
    const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
        staggerChildren: 0.1
        }
    }
    };

    const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
        duration: 0.5,
        ease: "easeOut"
        }
    }
    };

  
    if (loading) {
      return <Loader isOpen={true} message="Loading announcements..." />
    }
  // Error state
  if (error) {
    return (
        <>
        <div className="w-full flex flex-col justify-center items-center px-2 py-10 sm:px-5 md:px-10 lg:px-15 xl:px-22 space-y-6">
           <LuAlertCircle className="w-16 h-16 text-red-500" />
          <Errors 
          status_code={error.status ||500}
          title='Error Loading Announcements'
          onClick={() => window.location.reload()}
          message={error.message || 'Failed to load announcements. Please try again later.'}
          buttonText="Retry"
          />
        </div>
        </>
    );
    }

  // Handle both single announcement and array of announcements
  const announcements = Array.isArray(data.announcements) ? data.announcements : [data.announcements];

  return (
   <>
    <div className="w-full bg-gray-50 py-8 px-4 sm:px-8 lg:px-16">
      <div className="mx-auto">
        {/* Header */}
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-start mb-12"
        >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Announcements
            </h1>
            <p className="text-xl text-gray-600">
            Stay updated with the latest news and important information
            </p>
        </motion.div>

        {/* Announcements List */}
        {announcements.length === 0 ? (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
            >
            <p className="text-gray-500 text-lg">No announcements available at the moment.</p>
            </motion.div>
        ) : (
            <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
            >
            <AnimatePresence>
                {announcements.map((announcement, index) => (
                <AlertCard
                    announcement={announcement}
                    index={index}
                    variants={itemVariants}
                />
                ))}
            </AnimatePresence>
            </motion.div>
        )}
      </div>
    </div>
   </>
  );
};

export default AnnouncementsPage;