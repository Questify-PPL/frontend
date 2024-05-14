"use client";

import { Button } from "@/components/ui/button";
import { createReport } from "@/lib/action/user";
import clsx from "clsx";
import { useState, useTransition } from "react";
import { Loading } from "../common";
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
import { useToast } from "../ui/use-toast";

const max_characters = 200;

export type ReportDialogProps = {
  individual: {
    respondentId: string;
    name: string;
    email: string;
    isReported: boolean;
  };
  formId: string;

  // eslint-disable-next-line no-unused-vars
  handleReport: (isReported: boolean) => void;
};

export function ReportDialog({
  individual,
  formId,
  handleReport,
}: Readonly<ReportDialogProps>) {
  const [characterCount, setCharacterCount] = useState(0);
  const [reason, setReason] = useState("");

  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmitReport = () => {
    startTransition(async () => {
      const response = await createReport({
        reportToId: individual.respondentId,
        formId: formId,
        message: reason,
      });
      const notificationMessage = response
        ? {
            title: "Failed to create report",
            description:
              "Please try again in a few minutes or contact our support team",
          }
        : {
            title: "Success to create report",
          };
      toast(notificationMessage);

      if (response === undefined) {
        handleReport(true);
        setOpen(false);
        setReason("");
      }
    });
  };

  const disabled = individual.isReported;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={clsx({
            "bg-rose-700 text-white": !disabled,
            "bg-gray-300 text-gray-500": disabled,
          })}
          disabled={disabled}
        >
          {disabled ? "Reported" : "Report"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitReport();
          }}
        >
          <DialogHeader>
            <DialogTitle>Report</DialogTitle>
            <DialogDescription>
              Report <span className="font-bold">{individual.name}</span> to the
              Admin
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
                  setCharacterCount(e.target.value.length);
                  setReason(e.target.value);
                }}
                value={reason}
                required={true}
                maxLength={200}
                minLength={20}
              />
            </div>
            <div className="flex justify-between">
              <span>Minimum 20 characters</span>
              <span>
                {characterCount}/{max_characters}
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {" "}
              {isPending && <Loading />} Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
