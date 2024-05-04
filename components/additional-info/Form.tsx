"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Terminus from "@/components/respondent-side/Terminus";
import QuestionBox from "@/components/respondent-side/QuestionBox";
import QuestionLayout from "@/components/questions/QuestionLayout";
import QuestionNum from "../questions/QuestionNum";
import { LuCheck, LuChevronRight, LuCheckCheck } from "react-icons/lu";
import { useForm, SubmitHandler } from "react-hook-form";
import { AdditionalInfo, FieldName } from "@/lib/schema/additional-info.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "@/lib/action";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const steps = [
  {
    fields: [],
  },
  {
    fields: ["name"],
  },
  {
    fields: ["gender", "birthdate", "phoneNumber", "companyName"],
  },
  {
    fields: [],
  },
];

const Form = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<AdditionalInfo>({
    resolver: zodResolver(AdditionalInfo),
    defaultValues: {
      name: "",
      birthDate: undefined,
      gender: undefined,
      phoneNumber: "",
      companyName: "",
    },
  });

  const processForm: SubmitHandler<AdditionalInfo> = (data) => {
    startTransition(async () => {
      const formData = new FormData();
      const [firstName, ...lastNameArr] = data.name.split(/\s+/);
      const lastName = lastNameArr.join(" ");

      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("birthDate", data.birthDate.toISOString());
      formData.append("gender", data.gender.toUpperCase());
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("companyName", data.companyName);

      const response = await updateProfile(undefined, formData);

      const notificationMessage = response
        ? {
            title: "Failed to update profile information",
            description:
              "Please try again in a few minutes or contact our support team",
          }
        : {
            title: "Success to update profile information",
          };
      toast(notificationMessage);

      if (!response) {
        router.replace("/home");
      }
    });
  };

  const next = async () => {
    console.log("next");
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    console.log("prev");
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <form
      className="flex w-full h-full justify-center items-center"
      onSubmit={handleSubmit(processForm)}
    >
      {currentStep == 0 && (
        <Terminus
          QRETitle="User Additional Information"
          terminusImage={
            <Image
              src="/assets/Questify.svg"
              alt="Questify"
              width={70}
              height={16}
              className="hidden md:block"
            />
          }
          terminusSectionTitle="Opening"
          terminusText="Greetings! Welcome to Questify. Let's get you set up swiftly; it'll only take a few seconds to ensure you're ready to go."
          buttonType="button"
          buttonClickHandler={next}
          buttonText="Start"
          buttonIcon={<LuChevronRight className="w-5 h-5" />}
          className="w-full max-w-96 md:max-w-none md:w-[50%] h-[90%] rounded-none md:rounded-md"
        />
      )}

      {currentStep === 1 && (
        <QuestionBox
          className="w-full max-w-96 md:max-w-none md:w-[50%] h-[90%] rounded-none md:rounded-md"
          QRETitle="User Additional Information"
          questionImage={
            <Image
              src="/assets/Questify.svg"
              alt="Questify"
              width={70}
              height={16}
              className="hidden md:block"
            />
          }
          questionNum={
            <QuestionNum
              isRequired={true}
              questionNum={currentStep}
              isSection={false}
              sectionText="This section is made to add a personal touch to your account."
            />
          }
          questions={
            <QuestionLayout
              role="RESPONDENT"
              question="What's your name?"
              description="Fill with your full name."
              answer={
                <div className="flex flex-col gap-0.5 w-full">
                  <Input
                    type="text"
                    placeholder="Your answer here"
                    {...register("name")}
                    className="text-base md:text-2xl placeholder:text-primary/40 border-none rounded-none p-0 focus-visible:ring-background"
                  />
                  <span className="w-full h-0.5 bg-primary/40"></span>
                  {errors.name && (
                    <div className="text-red-500 font-normal text-xs mt-0.5">
                      {errors.name.message}
                    </div>
                  )}
                </div>
              }
            ></QuestionLayout>
          }
          prevButton={prev}
          nextButton={next}
          buttonText="Next"
          buttonIcon={<LuCheck className="w-5 h-5" />}
        />
      )}

      {currentStep == 2 && (
        <QuestionBox
          className="w-full max-w-96 md:max-w-none md:w-[50%] md:h-[90%] rounded-none md:rounded-md"
          QRETitle="User Additional Information"
          questionImage={
            <Image
              src="/assets/Questify.svg"
              alt="Questify"
              width={70}
              height={16}
              className="hidden md:block"
            />
          }
          questionNum={
            <QuestionNum
              isRequired={true}
              questionNum={currentStep}
              isSection={true}
              sectionText="This section is made to add a personal touch to your account."
            />
          }
          questions={
            <div className="flex flex-col gap-4 w-full">
              <QuestionLayout
                role="RESPONDENT"
                numbering={1}
                question="What's your gender?"
                answer={
                  <div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Input
                          type="radio"
                          value="Male"
                          id="option-one"
                          className="flex h-4 w-4 border-[1px] border-solid border-[#CDDDE1]"
                          {...register("gender")}
                          name="gender"
                        />
                        <Label
                          className="text-base font-medium"
                          htmlFor="option-one"
                        >
                          Male
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="radio"
                          value="Female"
                          id="option-two"
                          className="flex h-4 w-4 border-[1px] border-solid border-[#CDDDE1]"
                          {...register("gender")}
                          name="gender"
                        />
                        <Label className="text-base" htmlFor="option-two">
                          Female
                        </Label>
                      </div>
                    </div>
                    {errors.gender && (
                      <div className="text-red-500 font-normal text-xs mt-0.5">
                        {errors.gender.message}
                      </div>
                    )}
                  </div>
                }
              ></QuestionLayout>
              <QuestionLayout
                role="RESPONDENT"
                numbering={2}
                question="When were you born?"
                answer={
                  <div>
                    <Input
                      type="date"
                      placeholder="DD/MM/YYYY"
                      {...register("birthDate")}
                      className="text-base placeholder:text-primary/40 border-none rounded-none p-0 focus-visible:ring-background"
                    />
                    {errors.birthDate && (
                      <div className="text-red-500 font-normal text-xs mt-0.5">
                        {errors.birthDate.message}
                      </div>
                    )}
                  </div>
                }
              ></QuestionLayout>
              <QuestionLayout
                role="RESPONDENT"
                numbering={3}
                question="Phone Number"
                answer={
                  <div>
                    <Input
                      type="text"
                      placeholder="Your number here"
                      {...register("phoneNumber")}
                      className="text-base placeholder:text-primary/40 border-none rounded-none p-0 focus-visible:ring-background h-fit"
                    />
                    {errors.phoneNumber && (
                      <div className="text-red-500 font-normal text-xs mt-0.5">
                        {errors.phoneNumber.message}
                      </div>
                    )}
                  </div>
                }
              ></QuestionLayout>
              <QuestionLayout
                role="RESPONDENT"
                numbering={4}
                question="Company Name"
                answer={
                  <div>
                    <Input
                      type="text"
                      placeholder="Your company name here"
                      {...register("companyName")}
                      className="text-base placeholder:text-primary/40 border-none rounded-none p-0 focus-visible:ring-background h-fit"
                    />
                    {errors.companyName && (
                      <div className="text-red-500 font-normal text-xs mt-0.5">
                        {errors.companyName.message}
                      </div>
                    )}
                  </div>
                }
              ></QuestionLayout>
            </div>
          }
          prevButton={prev}
          nextButton={next}
          buttonText="Next"
          buttonIcon={<LuCheck className="w-5 h-5" />}
        />
      )}

      {currentStep === 3 && (
        <Terminus
          QRETitle="User Additional Information"
          terminusImage={
            <Image
              src="/assets/Questify.svg"
              alt="Questify"
              width={70}
              height={16}
              className="hidden md:block"
            />
          }
          terminusSectionTitle="Ending"
          terminusText="All set! Let's jump into the workspace."
          buttonClickHandler={next}
          buttonText="Finish"
          buttonIcon={<LuCheckCheck className="w-5 h-5" />}
          buttonType="submit"
          buttonDisabled={isPending}
          className="w-full max-w-96 md:max-w-none md:w-[50%] h-[90%]"
        />
      )}
    </form>
  );
};

Form.displayName = "Form";

export default Form;
