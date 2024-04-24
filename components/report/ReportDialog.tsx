"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

const max_characters = 200;

export type ReportDialogProps = {
  reportedUser: {
    name: string;
    id: string;
  };
};

export function ReportDialog({ reportedUser }: Readonly<ReportDialogProps>) {
  const [characterCount, setCharacterCount] = useState(0);
  const [reason, setReason] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-rose-700 text-white">
          Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action="">
          <DialogHeader>
            <DialogTitle>Report</DialogTitle>
            <DialogDescription>
              Report <span className="font-bold">{reportedUser.name}</span> to
              the Admin
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-2">
              <Label htmlFor="reason" className="text-right inline-block mb-2">
                Reason
              </Label>
              <Textarea
                id="reason"
                className="h-40 resize-none"
                placeholder="Elaborate the reason so that we can take appropriate action"
                onChange={(e) => {
                  if (e.target.value.length === max_characters + 1) {
                    e.target.value = reason;
                  } else if (e.target.value.length > max_characters + 1) {
                    e.target.value = e.target.value.slice(0, max_characters);
                  }
                  setCharacterCount(e.target.value.length);
                  setReason(e.target.value);
                }}
                value={reason}
                required={true}
              />
            </div>
            <div className="text-right">
              {characterCount}/{max_characters}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
