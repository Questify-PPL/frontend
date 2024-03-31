"use server";

import { auth } from "@/auth";
import { URL } from "@/lib/constant";
import { FetchListForm } from "../types";
import { QuestionnaireItem } from "../context";

export async function createQuestionnaire(
  title: string,
  prize: number,
  prizeType: string,
  maxParticipant?: number,
  maxWinner?: number,
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
      maxParticipant,
      maxWinner,
    }),
  });

  if (response.status !== 201) {
    throw new Error("Failed to create questionnaire");
  }

  return await response.json();
}

export async function getQuestionnairesOwned() {
  const session = await auth();
  const user = session?.user;

  const response = await fetch(URL.getAllCreatorForm, {
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
    },
  );

  if (response.status !== 200) {
    throw new Error("Failed to get questionnaire");
  }

  return await response.json();
}

export async function patchQuestionnaire(
  formId: string,
  data: any[] | QuestionnaireItem[],
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
    },
  );

  if (response.status !== 200) {
    throw new Error("Failed to update questionnaire");
  }

  return await response.json();
}
