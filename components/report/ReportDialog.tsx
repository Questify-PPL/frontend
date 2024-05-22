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
import { MessageCircleWarningIcon } from "lucide-react";

const minCharacters = 20;
const maxCharacters = 200;

export type ReportDialogProps = {
  user: {
    reportedId: string;
    isReported: boolean;
  };
  reportedInfo: string;
  formId: string;

  // eslint-disable-next-line no-unused-vars
  handleReport: (isReported: boolean) => void;
  asIcon?: boolean;
};

export function ReportDialog({
  user,
  reportedInfo,
  formId,
  handleReport,
  asIcon = false,
}: Readonly<ReportDialogProps>) {
  const [characterCount, setCharacterCount] = useState(0);
  const [reason, setReason] = useState("");

  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmitReport = () => {
    startTransition(async () => {
      const response = await createReport({
        reportToId: user.reportedId,
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

  const disabled = user.isReported;
  const buttonText = (
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
  );

  const buttonIcon = (
    <Button className="bg-white hover:bg-white" disabled={disabled}>
      <MessageCircleWarningIcon
        width={24}
        height={24}
        className={clsx({
          "fill-red-500": !disabled,
          "fill-gray-500": disabled,
        })}
      />
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{asIcon ? buttonIcon : buttonText}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (reason.length < minCharacters) {
              toast({ title: "Reason is too short" });
              return;
            }

            handleSubmitReport();
          }}
        >
          <DialogHeader>
            <DialogTitle>Report</DialogTitle>
            <DialogDescription>
              Report <span className="font-bold">{reportedInfo}</span> to the
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
                maxLength={maxCharacters}
                minLength={minCharacters}
              />
            </div>
            <div className="flex justify-between">
              <span>Minimum 20 characters</span>
              <span>
                {characterCount}/{maxCharacters}
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
