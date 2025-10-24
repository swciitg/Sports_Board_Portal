import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuLoader2, LuAlertCircle } from 'react-icons/lu';
import { useAnnouncementsPageData } from '../hooks/useAnnouncementsPageData';
import Header from "../components/Header";
import Footer from "../components/Footer";
import AlertCard from '../components/AlertCard';

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

  // Loading state
    if (loading) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
            <LuLoader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Loading announcements...</p>
        </div>
        </div>
    );
    }

  // Error state
  if (error) {
    return (
        <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
            <LuAlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Announcements</h2>
            <p className="text-gray-600 mb-4">
            {error.message || 'Failed to load announcements. Please try again later.'}
            </p>
            <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
            Retry
            </button>
        </div>
        </div>
        <Footer />
        </>
    );
    }

  // Handle both single announcement and array of announcements
  const announcements = Array.isArray(data) ? data : [data];

  return (
   <>
    <Header />
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-8 lg:px-16">
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
    <Footer />
   </> 
  );
};

export default AnnouncementsPage;