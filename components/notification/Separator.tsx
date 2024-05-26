import React from "react";
import { Card } from "../ui/card";

const Separator: React.FC = () => {
  return (
    <Card
      data-testid="separator"
      className="mt-2 mb-2 sm:w-1/3 items-center justify-center text-center bg-[#E5EEF0] text-[#32636A]"
    >
      You Have New Notifications
    </Card>
  );
};

export default Separator;
