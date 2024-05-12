import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function ReportMessageHover({ message }: Readonly<{ message: string }>) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">
          {message.slice(0, 21)}
          {message.length > 20 ? "..." : ""}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80" align="end">
        {message}
      </HoverCardContent>
    </HoverCard>
  );
}
