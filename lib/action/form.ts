"use server";

import { auth } from "@/auth";
import { URL } from "@/lib/constant";
import { Answer, QuestionnaireItem } from "../context";
import { FetchListForm } from "../types";
import { unstable_noStore as noStore } from "next/cache";

export async function createQuestionnaire(
  title: string,
  prize: number,
  prizeType: string,
  maxWinner?: number
) {
  const session = await auth();
  const user = session?.user;

  const response = await fetch(URL.createForm, {
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      title,
      prize,
      prizeType,
      maxWinner,
    }),
  });

  if (response.status !== 201) {
    throw new Error("Failed to create questionnaire");
  }

  return await response.json();
}

export async function getAllAvailableForm() {
  const session = await auth();
  const user = session?.user;

  const response = await fetch(URL.createForm, {
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  if (response.status !== 200) {
    throw new Error("Failed to get all available form");
  }

  const result: FetchListForm = await response.json();

  if (!result.data) {
    return [];
  }

  return result.data;
}

export async function getQuestionnairesOwned(type?: string) {
  const session = await auth();
  const user = session?.user;

  const url = type
    ? `${URL.getAllCreatorForm}?type=${type}`
    : URL.getAllCreatorForm;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  if (response.status !== 200) {
    throw new Error("Failed to get questionnaires owned");
  }

  const result: FetchListForm = await response.json();

  if (!result.data) {
    return [];
  }

  return result.data;
}

export async function getQuestionnairesFilled() {
  noStore();
  const session = await auth();
  const user = session?.user;

  const response = await fetch(URL.getAllRespondentForm, {
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  if (response.status !== 200) {
    throw new Error("Failed to get questionnaires filled");
  }

  const result: FetchListForm = await response.json();

  if (!result.data) {
    return [];
  }

  return result.data;
}

export async function getQuestionnaire(formId: string) {
  const session = await auth();
  const user = session?.user;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/form/${formId}?type=creator`,
    {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to get questionnaire");
  }

  return await response.json();
}

export async function getQuestionnaireRespondent(formId: string) {
  const session = await auth();
  const user = session?.user;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/form/${formId}?type=respondent`,
    {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to get questionnaire as respondent");
  }

  return await response.json();
}

// Redundant need to adjust later
export async function getCompletedQuestionnaireForRespondent(formId: string) {
  const session = await auth();
  const user = session?.user;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/form/${formId}?type=respondent`,
    {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to get questionnaire");
  }

  const result = await response.json();

  return result.data;
}

export async function getSummaries(formId: string) {
  const session = await auth();

  const user = session?.user;

  const [
    formStatisticsResponse,
    questionsWithAnswersResponse,
    allIndividualsResponse,
  ] = await Promise.all([
    fetch(`${URL.summaryURL}/${formId}/statistics`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    }),
    fetch(`${URL.summaryURL}/${formId}/questions`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    }),
    fetch(`${URL.summaryURL}/${formId}/individual`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    }),
  ]);

  const [formStatistics, questionsWithAnswers, allIndividuals] =
    await Promise.all([
      formStatisticsResponse.json(),
      questionsWithAnswersResponse.json(),
      allIndividualsResponse.json(),
    ]);

  return {
    formStatistics: formStatistics.data,
    questionsWithAnswers: questionsWithAnswers.data,
    allIndividuals: allIndividuals.data,
  };
}

export async function getInitialActiveTab(): Promise<
  "summary" | "question" | "individual"
> {
  return Promise.resolve("summary");
}

export async function patchQuestionnaire(
  formId: string,
  data: QuestionnaireItem[]
) {
  const session = await auth();
  const user = session?.user;
  const update = {
    formQuestions: data,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/form/${formId}`,
    {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(update),
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to update questionnaire");
  }
}

export async function publishQuestionnaire(formId: string) {
  const session = await auth();
  const user = session?.user;

  const publish = {
    isPublished: true,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/form/${formId}`,
    {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(publish),
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to publish questionnaire");
  }
}

export async function unpublishQuestionnaire(formId: string) {
  const session = await auth();
  const user = session?.user;

  const unpublish = {
    isPublished: false,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/form/${formId}`,
    {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(unpublish),
    },
  );

  const result = await response.json();

  if (response.status >= 400) {
    throw new Error(result.message);
  }
}

export async function deleteQuestionnaire(formId: string) {
  const session = await auth();
  const user = session?.user;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/form/${formId}`,
    {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      method: "DELETE",
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to delete questionnaire");
  }
}

export async function deleteQuestion(formId: string, questionId: number) {
  const session = await auth();
  const user = session?.user;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/form/${formId}/question/${questionId}`,
    {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      method: "DELETE",
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to delete question");
  }
}

export async function postParticipation(formId: string) {
  const session = await auth();
  const user = session?.user;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/form/participate/${formId}`,
    {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  );

  if (response.status !== 201) {
    throw new Error("Failed to participate to the questionnaire");
  }

  return await response.json();
}

export async function patchAnswer(
  formId: string,
  // data: any[] | QuestionnaireItem[],
  data: any[] | Answer[],
  isFinal: boolean = false
) {
  const session = await auth();
  const user = session?.user;
  let update: any;

  if (isFinal) {
    const formattedData = data.map((item: any) => {
      return {
        questionId: item.questionId,
        answer: item.answer,
      };
    });

    update = {
      isCompleted: true,
      questionsAnswer: formattedData,
    };
  } else {
    update = {
      questionsAnswer: data,
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/form/participate/${formId}`,
    {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(update),
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to add answer to the questionnaire");
  }

  return await response.json();
}
