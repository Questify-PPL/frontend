import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import React from "react";

interface NotificationProps {
  title: string;
  message: string;
}

const NotificationMessage: React.FC<NotificationProps> = ({
  title,
  message,
}) => {
  return (
    <div className="p-2">
      <div className="flex justify-between">
        <span className="text-m font-bold text-nowrap">{title}</span>
      </div>
      <div>
        <span className="text-xs ">{message}</span>
      </div>
    </div>
  );
};

const NotificationCard: React.FC<{ title: string; message: string }> = ({
  title,
  message,
}) => {
  return (
    <motion.div
      className={`relative md:w-fit sm:w-fit h-fit gap-2`}
      data-testid="notification-card"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <NotificationMessage title={title} message={message} />
      </Card>
    </motion.div>
  );
};

export default NotificationCard;
