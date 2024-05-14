"use client";
import NotificationCard from "@/components/notification/NotificationCard";
import { motion } from "framer-motion";

export default function Notification() {
  return (
    <div className="flex flex-col">
      <div>
        <motion.span
          className="font-bold md:text-2xl sm:text-base flex justify-center items-center mb-5 mt-5"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          data-testid="notification-text"
        >
          Notifications
        </motion.span>
      </div>
      <div className="flex justify-center items-center">
        <NotificationCard
          title={"Congratulations"}
          message={
            "You have won questionnaire A. We have added the price to your credit."
          }
        ></NotificationCard>
      </div>
    </div>
  );
}
