import React from "react";
import { BareForm } from "@/lib/types";
import { Card } from "../ui/card";
import { isEnded } from "@/lib/utils";

interface NotificationCardProps {
  form: BareForm;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ form }) => {
  const hasEnded = isEnded(form.endedAt);

  if (!hasEnded) {
    return null;
  }

  return (
    <Card className="relative mx-auto sm:w-auto h-fit gap-2">
      <div className="p-2">
        <div className="flex justify-between">
          <span className="text-m font-bold text-nowrap">
            {form.winningStatus ? "Congratulations!" : "Sorry"}
          </span>
        </div>
        <div className="flex flex-col text-pretty">
          <span className="text-sm sm:text-xs">
            {form.winningStatus
              ? "You have won on Questionnaire "
              : "You still lose on Questionnaire"}
          </span>
          <span className="text-sm ml font-bold sm:text-xs">
            {form.title}
          </span>
        </div>
        <div className="flex flex-row"></div>
        <span className="sm:text-xs text-xs text-[#808080]">Ended at</span>
        <span className="sm:text-xs text-xs text-[#808080] ml-1">
          {form.endedAt.substring(0, 10)}
        </span>
      </div>
    </Card>
  );
};

export default NotificationCard;
