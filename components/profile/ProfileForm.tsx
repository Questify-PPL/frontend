"use client";

import { format } from "date-fns";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { ActionReponse, User } from "@/lib/types";
import { EditIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { UpdateState, updateProfile } from "@/lib/action";
import { useRouter } from "next/navigation";
import { Loading } from "../common";
import { titleCase } from "@/lib/utils";
import { FlattenedUpdateErrors } from "@/lib/schema";
import clsx from "clsx";
import { useToast } from "../ui/use-toast";

export function ProfileFormWrapper({
  user,
}: Readonly<{
  user: User;
}>) {
  const [formKey, setFormKey] = useState(0);

  const updateFormKey = () => setFormKey((key) => key + 1);
  return <ProfileForm key={formKey} onReset={updateFormKey} user={user} />;
}

export function ProfileForm({
  user,
  onReset,
}: Readonly<{
  user: User;
  onReset: () => void;
}>) {
  const [isEdited, setIsEdited] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [error, dispatch] = useFormState<UpdateState, FormData>(
    updateProfile,
    undefined,
  );

  const router = useRouter();
  const { toast } = useToast();

  let errorMessage = {
    firstName: error && (error as FlattenedUpdateErrors).fieldErrors?.firstName,
    lastName: error && (error as FlattenedUpdateErrors).fieldErrors?.lastName,
    gender: error && (error as FlattenedUpdateErrors).fieldErrors?.gender,
    birthDate: error && (error as FlattenedUpdateErrors).fieldErrors?.birthDate,
    phoneNumber:
      error && (error as FlattenedUpdateErrors).fieldErrors?.phoneNumber,
    companyName:
      error && (error as FlattenedUpdateErrors).fieldErrors?.companyName,
  };

  useEffect(() => {
    if (!error && isSubmited) {
      setIsEdited(false);
      setIsSubmited(false);
      toast({
        title: "Success to update profile!!",
      });
      router.refresh();
    } else if (
      (error as ActionReponse)?.message === "Failed to update profile"
    ) {
      toast({
        title: "Failed to update profile!",
        description:
          "Please try again in a few minutes or contact our support team",
      });
    }
  }, [error, isSubmited, router, toast]);

  return (
    <form
      action={(payload: FormData) => {
        dispatch(payload);
        setIsSubmited(true);
      }}
      className="mb-8 text-xs sm:text-[14px]"
      onReset={onReset}
    >
      <h2 className="font-bold mb-1 sm:mb-2 text-[14px] sm:text-base flex justify-between items-center">
        Personal Information
        <div>
          {!isEdited && (
            <Button
              type="button"
              onClick={() => setIsEdited(true)}
              className="text-white sm:text-sm text-xs h-7 w-24"
            >
              <EditIcon className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
          {isEdited && (
            <div className="flex gap-1 sm:gap-2 flex-wrap-reverse justify-end">
              <Button
                type="reset"
                className="text-primary bg-white font-bold sm:text-sm text-xs hover:bg-[#E5EEF0] h-7 border w-24"
              >
                Cancel
              </Button>
              <SaveButton />
            </div>
          )}
        </div>
      </h2>
      <div className="text-gray-500 mb-3">
        This information will be shared to the creator
      </div>
      <div className="grid grid-cols-[125px_1fr] sm:grid-cols-[repeat(2,125px_minmax(100px,400px))] gap-1 sm:gap-y-2 sm:gap-x-6">
        {!isEdited && (
          <>
            <span>First Name</span>
            <span>{user.firstName}</span>
            <span>Last Name</span>
            <span>{user.lastName}</span>
            <span>Gender</span>
            <span>{titleCase(user.gender as string)}</span>
            <span>Birth Date</span>
            <span>{user.birthDate && format(user.birthDate, "dd MMM y")}</span>
            <span>Phone Number</span>
            <span>{user.phoneNumber}</span>
            <span>Email</span>
            <span>{user.email}</span>
            <span>Company Name</span>
            <span>{user.companyName}</span>
          </>
        )}
        {isEdited && (
          <>
            <Label htmlFor="firstName" className="font-normal leading-4">
              First Name
            </Label>
            <div>
              <Input
                name="firstName"
                className={`h-6 px-0 bg-gray-100 ${clsx({
                  "border-destructive": errorMessage.firstName,
                })}`}
                defaultValue={`${user.firstName}`}
                id="firstName"
              />
              {errorMessage.firstName && (
                <span className="block mt-1 text-[#DA0A1E]">
                  {errorMessage.firstName}
                </span>
              )}
            </div>
            <Label htmlFor="lastName" className="font-normal leading-4">
              Last Name
            </Label>
            <div>
              <Input
                name="lastName"
                className={`h-6 px-0 bg-gray-100 ${clsx({
                  "border-destructive": errorMessage.lastName,
                })}`}
                defaultValue={`${user.lastName}`}
                id="lastName"
              />
              {errorMessage.lastName && (
                <span className="block mt-1 text-[#DA0A1E]">
                  {errorMessage.lastName}
                </span>
              )}
            </div>
            <Label htmlFor="gender" className="font-normal leading-4">
              Gender
            </Label>
            <div>
              <Select
                name="gender"
                defaultValue={`${user.gender}`.toUpperCase()}
              >
                <SelectTrigger
                  className={`h-6 px-0 bg-gray-100 ${clsx({
                    "border-destructive": errorMessage.gender,
                  })}`}
                >
                  <SelectValue placeholder={`${user.gender}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
              {errorMessage.gender && (
                <span className="block mt-1 text-[#DA0A1E]">
                  {errorMessage.gender}
                </span>
              )}
            </div>
            <Label
              htmlFor="birthDate"
              className="font-normal leading-4"
              id="gender"
            >
              Birth Date
            </Label>
            <div>
              <Input
                type="date"
                name="birthDate"
                placeholder="DD/MM/YYYY"
                className={`text-base placeholder:text-primary/40 rounded-none p-0 focus-visible:ring-background bg-gray-100 h-6 justify-start ${clsx(
                  {
                    "border-destructive": errorMessage.birthDate,
                  },
                )}`}
                defaultValue={format(
                  new Date(user.birthDate as string),
                  "yyyy-MM-dd",
                )}
              />
              {errorMessage.birthDate && (
                <span className="block mt-1 text-[#DA0A1E]">
                  {errorMessage.birthDate}
                </span>
              )}
            </div>

            <Label defaultValue="phoneNumber" className="font-normal leading-4">
              Phone Number
            </Label>
            <div>
              <Input
                name="phoneNumber"
                type="tel"
                className={`h-6 px-0 bg-gray-100 ${clsx({
                  "border-destructive": errorMessage.phoneNumber,
                })}`}
                defaultValue={`${user.phoneNumber}`}
                id="phoneNumber"
              />
              {errorMessage.phoneNumber && (
                <span className="block mt-1 text-[#DA0A1E]">
                  {errorMessage.phoneNumber}
                </span>
              )}
            </div>
            <span>Email</span>
            <span>{user.email}</span>
            <Label htmlFor="companyName" className="font-normal leading-4">
              Company Name
            </Label>
            <div>
              <Input
                name="companyName"
                className={`h-6 px-0 bg-gray-100 ${clsx({
                  "border-destructive": errorMessage.companyName,
                })}`}
                defaultValue={`${user.companyName}`}
                id="companyName"
              />
              {errorMessage.companyName && (
                <span className="block mt-1 text-[#DA0A1E]">
                  {errorMessage.companyName}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </form>
  );
}
function SaveButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="text-white sm:text-sm text-xs h-7 w-24"
      disabled={pending}
    >
      {pending && <Loading />}
      Save
    </Button>
  );
}
