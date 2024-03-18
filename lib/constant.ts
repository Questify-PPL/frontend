import { QuestionnaireItem, Answer } from "@/lib/context";

export const BENEFIT = [
  {
    src: "https://res.cloudinary.com/dicmrrmdr/image/upload/f_auto,q_auto/v1/questify/fgdt8bbziw7cm8mhqgwn",
    title: "Credible Only Access",
    description:
      "Ensure only credible participants in the Creator's Questionnaire for reliable insights.",
  },
  {
    src: "https://res.cloudinary.com/dicmrrmdr/image/upload/f_auto,q_auto/v1/questify/qlfv2tztovjo0zcv8bb9",
    title: "Prize Certainty",
    description:
      "The prize is sealed and secured for Responders by the time Creator generate the Questionnaire.",
  },
  {
    src: "https://res.cloudinary.com/dicmrrmdr/image/upload/f_auto,q_auto/v1/questify/hxu6oedkpnjpwxdvi3et",
    title: "The Control is All Yours",
    description:
      "Discover the thrill of prize distribution: Random or Fair? The choice is in the hands of the Creator.",
  },
  {
    src: "https://res.cloudinary.com/dicmrrmdr/image/upload/f_auto,q_auto/v1/questify/eprno0r0hjiscekl0utn",
    title: "Feel the Flexibility",
    description:
      "Experience an exquisite and user-friendly interface for both Creators and Responders.",
  },
];

export const URL = {
  login: `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
  profile: `${process.env.NEXT_PUBLIC_API_URL}/user/me`,
  createForm: `${process.env.NEXT_PUBLIC_API_URL}/form`,
  getAllCreatorForm: `${process.env.NEXT_PUBLIC_API_URL}/form/creator`,
  getAllRespondentForm: `${process.env.NEXT_PUBLIC_API_URL}/form/respondent`,
  updateProfile: `${process.env.NEXT_PUBLIC_API_URL}/user/update-profile`,
};

export const QUESTIONNAIRE: QuestionnaireItem[] = [
  {
    type: "SECTION",
    sectionId: 1,
    sectionName: "Section 1",
    sectionDescription: "This is the first section of the questionnaire",
    questions: [
      {
        questionId: 1,
        questionType: "CHECKBOX",
        questionTypeName: "Multiple Choice",
        isRequired: false,
        question: "What is your favorite programming language?",
        description: "Choose one from the options below",
        choice: [],
      },
      {
        questionId: 2,
        questionType: "TEXT",
        questionTypeName: "Short Text",
        isRequired: false,
        question: "question2",
        description: "desc2",
      },
      {
        questionId: 3,
        questionType: "RADIO",
        questionTypeName: "Multiple Choice",
        isRequired: false,
        question: "Are you enjoying this tutorial?",
        description: "",
      },
    ],
  },
  {
    type: "SECTION",
    sectionId: 2,
    sectionName: "Section 2",
    sectionDescription: "This is the second section of the questionnaire",
    questions: [
      {
        questionId: 4,
        questionType: "CHECKBOX",
        questionTypeName: "Multiple Choice",
        isRequired: false,
        question: "What is your favorite programming language?",
        description: "Choose one from the options below",
        choice: [],
      },
      {
        questionId: 5,
        questionType: "TEXT",
        questionTypeName: "Short Text",
        isRequired: false,
        question: "question5",
        description: "desc5",
      },
    ],
  },
  {
    type: "DEFAULT",
    question: {
      questionId: 6,
      questionType: "TEXT",
      questionTypeName: "Short Text",
      isRequired: false,
      question: "question6",
      description: "desc6",
    },
  },
];

export const ANSWERS: Answer[] = [
  {
    questionId: 2,
    answer: "answer2",
  },
  {
    questionId: 5,
    answer: "answer5",
  },
  {
    questionId: 6,
    answer: "answer6",
  },
];
