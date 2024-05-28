import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useQuestionnaireContext } from "@/lib/hooks/useQuestionnaireContext";
import {
  QuestionTypeNames,
  findQuestionById,
  QuestionTypeNames as qtn,
} from "@/lib/services/form";
import { patchQuestionnaire } from "@/lib/action/form";
import { useEffect, useState } from "react";

export function QuestionChildren({ id }: Readonly<{ id: string }>) {
  const { questionnaire, activeQuestion, setQuestionnaire } =
    useQuestionnaireContext();
  const { question } = findQuestionById(
    activeQuestion as number,
    questionnaire,
  );

  const [requiredState, setRequiredState] = useState(false);
  const [typeNameState, setTypeNameState] = useState("");

  useEffect(() => {
    if (question) {
      setRequiredState(question.isRequired);
      setTypeNameState(question.questionTypeName);
    }
  }, [question]);

  const handleTypeChange = async (value: string) => {
    if (!question) return;

    const updatedQuestion = { ...question };

    updatedQuestion.questionTypeName = value;
    switch (value) {
      case qtn.SHORT_TEXT:
      case qtn.LONG_TEXT:
      case qtn.LINK:
      case qtn.DATE:
        updatedQuestion.questionType = "TEXT";
        break;
      case qtn.MULTIPLE_CHOICE:
      case qtn.YES_NO:
        updatedQuestion.questionType = "RADIO";
        break;
      case qtn.CHECKBOX:
        updatedQuestion.questionType = "CHECKBOX";
        break;
      default:
        return;
    }

    setTypeNameState(value);

    const updatedQuestionnaire = questionnaire.map((item) => {
      if (item.type === "SECTION") {
        return {
          ...item,
          questions: item.questions.map((q) =>
            q.questionId === updatedQuestion.questionId ? updatedQuestion : q,
          ),
        };
      } else if (
        item.type === "DEFAULT" &&
        item.question.questionId === updatedQuestion.questionId
      ) {
        return {
          ...item,
          question: updatedQuestion,
        };
      }
      return item;
    });

    setQuestionnaire(updatedQuestionnaire);

    try {
      await patchQuestionnaire(id, updatedQuestionnaire);
    } catch (error) {
      console.error("Failed to update the question type", error);
    }
  };

  const handleRequiredChange = async (checked: boolean) => {
    if (!question) return;

    setRequiredState(checked);

    const updatedQuestion = { ...question, isRequired: checked };

    const updatedQuestionnaire = questionnaire.map((item) => {
      if (item.type === "SECTION") {
        return {
          ...item,
          questions: item.questions.map((q) =>
            q.questionId === updatedQuestion.questionId ? updatedQuestion : q,
          ),
        };
      } else if (
        item.type === "DEFAULT" &&
        item.question.questionId === updatedQuestion.questionId
      ) {
        return {
          ...item,
          question: updatedQuestion,
        };
      }
      return item;
    });

    setQuestionnaire(updatedQuestionnaire);

    try {
      await patchQuestionnaire(id, updatedQuestionnaire);
    } catch (error) {
      console.error("Failed to update the question required status", error);
    }
  };

  if (!question)
    return (
      <div className="flex flex-col justify-center items-center">
        <span className="text-primary text-sm font-semibold">
          Select a question to start editing
        </span>
        <span className="text-[#95B0B4] text-xs">Watch the left pane :D</span>
      </div>
    );

  return (
    <div className="flex flex-col w-full items-center justify-center gap-4">
      <div className="flex flex-col gap-2">
        <Label>Type</Label>
        <Select value={typeNameState} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue
              className="placeholder:text-black"
              placeholder={typeNameState}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={QuestionTypeNames.SHORT_TEXT}>
              Short Text
            </SelectItem>
            <SelectItem value={QuestionTypeNames.LONG_TEXT}>
              Long Text
            </SelectItem>
            <SelectItem value={QuestionTypeNames.DATE}>Date</SelectItem>
            <SelectItem value={QuestionTypeNames.MULTIPLE_CHOICE}>
              Multiple Choice
            </SelectItem>
            <SelectItem value={QuestionTypeNames.CHECKBOX}>Checkbox</SelectItem>
            <SelectItem value={QuestionTypeNames.YES_NO}>Yes/No</SelectItem>
            <SelectItem value={QuestionTypeNames.LINK}>Link</SelectItem>
          </SelectContent>
        </Select>
        <span className="flex text-xs text-[#95B0B4] mt-2">
          If you&apos;re trying to change the Question Type from Choices group
          to other groups, you&apos;ll lose the choices.
        </span>
      </div>
      <Separator className="bg-[#E5EEF0]" />
      <div className="flex w-full items-center justify-between">
        <Label htmlFor="required-status">Required</Label>
        <Switch
          id="required-status"
          checked={requiredState}
          onCheckedChange={handleRequiredChange}
        />
      </div>
    </div>
  );
}
