"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LuX } from "react-icons/lu";
import { Label } from "@/components/ui/label";
import { handleTextAreaHeight } from "@/lib/utils";
import { ContactData } from "@/lib/types";
import { sendContactForm } from "@/lib/action/contact";
import { useToast } from "../ui/use-toast";

interface ContactModalProps {
  className: string;
  name: string;
  email: string;
  closeModal: () => void;
}

export function ContactModal(contactModalProps: Readonly<ContactModalProps>) {
  const { name, email, className, closeModal } = contactModalProps;
  const { toast } = useToast();

  const initState = {
    values: {
      name: name,
      email: email,
      subject: "",
      message: "",
    },
    errors: {
      name: "",
      subject: "",
      message: "",
    },
  };

  const [state, setState] = useState(initState);
  const { values, errors } = state;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleTextAreaHeight(event);
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [event.target.name]: event.target.value,
      },
      errors: {
        ...prev.errors,
        [event.target.name]:
          event.target.value.trim() === "" ? "This field is required" : "",
      },
    }));
  };

  const isValid = !errors.name && !errors.subject && !errors.message;

  const handleCloseModal = () => {
    setState(initState);
    closeModal();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, subject, message } = state.values;

    const nameError = name.trim() === "" ? "This field is required" : "";
    const subjectError = subject.trim() === "" ? "This field is required" : "";
    const messageError = message.trim() === "" ? "This field is required" : "";

    setState((prev) => ({
      ...prev,
      errors: {
        ...prev.errors,
        name: nameError,
        subject: subjectError,
        message: messageError,
      },
    }));

    if (!nameError && !subjectError && !messageError) {
      try {
        const contactData: ContactData = {
          subject,
          message,
        };
        const response = await sendContactForm(contactData);
        toast({
          title: "Success",
          description: response.message,
        });
        handleCloseModal();
      } catch (error) {
        console.error(error);
        toast({
          title: "Failed",
          description: "Internal server error",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <form
      data-testid="contact-modal"
      className={`absolute w-full h-full justify-center items-center bg-[#324B4F]/70 ${className}`}
      onSubmit={handleSubmit}
    >
      <Card className="flex flex-col xl:w-[35%] lg:w-[50%] w-[80%] p-5 justify-center items-center gap-6">
        <div className="flex flex-row justify-end w-full">
          <LuX
            className="w-5 h-5"
            onClick={handleCloseModal}
            data-testid="icon-x"
          ></LuX>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col justify-center items-center">
            <span className="flex font-extrabold text-xl">Contact Us</span>
            <span className="flex font-regular text-sm text-primary/40 text-center">
              Feel free to reach out to us with any questions, feedback, or
              inquiries you may have
            </span>
          </div>

          <div className="flex flex-col gap-2 w-full ">
            <Label>Name</Label>
            <div
              className={`resize-none whitespace-pre-wrap break-all overflow-y-hidden flex w-full rounded-md border bg-background px-3 py-2 text-sm ${!values.name && "text-muted-foreground"} focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2`}
            >
              {values.name
                ? values.name
                : "Please set your name in your profile"}
            </div>
            {errors.name && (
              <span className="text-red-500 text-xs" data-testid="error-name">
                {errors.name}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label>Email</Label>
            <div className="resize-none whitespace-pre-wrap break-all overflow-y-hidden flex w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2">
              {values.email}
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="subject">Subject</Label>
            <textarea
              id="subject"
              data-testid="subject"
              name="subject"
              value={values.subject}
              onChange={handleChange}
              onBlur={handleChange}
              className={`resize-none whitespace-pre-wrap overflow-y-hidden flex h-10 w-full rounded-md border ${
                errors.subject ? "border-red-500" : "border-input"
              } bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
              placeholder="Enter your subject here"
              rows={1}
            ></textarea>
            {errors.subject && (
              <span
                className="text-red-500 text-xs"
                data-testid="error-subject"
              >
                {errors.subject}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full pb-3">
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              data-testid="message"
              name="message"
              value={values.message}
              onChange={handleChange}
              onBlur={handleChange}
              className={`resize-none whitespace-pre-wrap overflow-y-hidden flex h-10 w-full rounded-md border ${
                errors.message ? "border-red-500" : "border-input"
              } bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
              placeholder="Enter your message here"
              rows={1}
            ></textarea>
            {errors.message && (
              <span
                className="text-red-500 text-xs"
                data-testid="error-message"
              >
                {errors.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-row w-full gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button type="submit" className="w-full" disabled={!isValid}>
            Send
          </Button>
        </div>
      </Card>
    </form>
  );
}
