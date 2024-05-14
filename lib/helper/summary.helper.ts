import { URL } from "../constant";
import { Questions, SectionGroupedWithAnswer } from "../types";
import { convertToCSV } from "../utils";

export async function exportForm(
  formId: string,
  accessToken: string,
  title: string,
  callback?: () => void,
) {
  try {
    const response = await fetch(`${URL.summaryURL}/${formId}/export`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status < 300) {
      await convertToCSV(response, title);

      return;
    }
    if (callback) callback();
  } catch (error) {
    if (callback) callback();
  }
}

export function removeUnnecessaryQuestions(
  individualFormQuestions: Questions | undefined,
) {
  const makeSureNoNull = individualFormQuestions?.filter(
    (question) => question !== null,
  );

  const removeOpeningAndClosing = makeSureNoNull?.filter((question) => {
    const haveSection = "sectionId" in question;

    if (
      (haveSection &&
        (question as SectionGroupedWithAnswer).name === "Opening") ||
      (question as SectionGroupedWithAnswer).name === "Ending"
    ) {
      return false;
    }

    return true;
  });

  return removeOpeningAndClosing;
}
