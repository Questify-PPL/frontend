import {
  Answer,
  QuestionnaireItem,
  QuestionnaireItemTypes,
} from "@/lib/context";
import { BareForm } from "./types";

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
  sendContactData: `${process.env.NEXT_PUBLIC_API_URL}/email/send-contact-data`,
  topUpInvoices: `${process.env.NEXT_PUBLIC_API_URL}/topup/all`,
  createWithdrawal: `${process.env.NEXT_PUBLIC_API_URL}/withdrawal/create`,
  getWithdrawal: `${process.env.NEXT_PUBLIC_API_URL}/withdrawal/owned`,
  validateInvoices: `${process.env.NEXT_PUBLIC_API_URL}/topup/validate`,
  summaryURL: `${process.env.NEXT_PUBLIC_API_URL}/form/summary`,
  validateTopupInvoices: `${process.env.NEXT_PUBLIC_API_URL}/topup/validate`,
  withdrawalInvoices: `${process.env.NEXT_PUBLIC_API_URL}/withdrawal/all`,
  validateWithdrawalInvoices: `${process.env.NEXT_PUBLIC_API_URL}/withdrawal/validate`,
  shop: `${process.env.NEXT_PUBLIC_API_URL}/shop`,
  topUpCreator: `${process.env.NEXT_PUBLIC_API_URL}/topup/creator`,
  processTopUp: `${process.env.NEXT_PUBLIC_API_URL}/topup/create?type=creator`,
  report: {
    all: `${process.env.NEXT_PUBLIC_API_URL}/report`,
    create: `${process.env.NEXT_PUBLIC_API_URL}/report`,
    update: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/report/${id}`,
  },
  getLinkMapping: (link: string) =>
    `${process.env.NEXT_PUBLIC_API_URL}/link/mapping/${link}`,
  user: {
    all: `${process.env.NEXT_PUBLIC_API_URL}/user`,
    update: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`,
  },
};

export const QUESTIONNAIRE: QuestionnaireItem[] = [
  {
    type: QuestionnaireItemTypes.SECTION,
    sectionId: 1,
    number: 1,
    sectionName: "Section 1",
    sectionDescription: "This is the first section of the questionnaire",
    questions: [
      {
        questionId: 1,
        number: 1,
        questionType: "CHECKBOX",
        questionTypeName: "Multiple Choice",
        isRequired: false,
        question: "What is your favorite programming language?",
        description: "Choose one from the options below",
        choice: [],
      },
      {
        questionId: 2,
        number: 2,
        questionType: "TEXT",
        questionTypeName: "Short Text",
        isRequired: false,
        question: "question2",
        description: "desc2",
      },
      {
        questionId: 3,
        number: 3,
        questionType: "RADIO",
        questionTypeName: "Multiple Choice",
        isRequired: false,
        question: "Are you enjoying this tutorial?",
        description: "",
      },
    ],
  },
  {
    type: QuestionnaireItemTypes.SECTION,
    sectionId: 2,
    number: 2,
    sectionName: "Section 2",
    sectionDescription: "This is the second section of the questionnaire",
    questions: [
      {
        questionId: 4,
        number: 1,
        questionType: "CHECKBOX",
        questionTypeName: "Multiple Choice",
        isRequired: false,
        question: "What is your favorite programming language?",
        description: "Choose one from the options below",
        choice: [],
      },
      {
        questionId: 5,
        number: 2,
        questionType: "TEXT",
        questionTypeName: "Short Text",
        isRequired: false,
        question: "question5",
        description: "desc5",
      },
    ],
  },
  {
    type: QuestionnaireItemTypes.DEFAULT,
    question: {
      questionId: 6,
      number: 3,
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

export const QUESTIONNAIRES_FILLED: BareForm[] = [
  {
    id: "form123",
    creatorId: "creator123",
    title:
      "Employee Satisfaction and Engagement Survey 2024: A Meta Analysis of Facebook Inc.",
    prize: 10000,
    prizeType: "EVEN",
    maxWinner: 3,
    createdAt: "2024-03-18T12:00:00",
    updatedAt: "2024-03-18T12:00:00",
    endedAt: "2024-07-31T12:00:00",
    ongoingParticipation: 7,
    completedParticipation: 3,
    questionFilled: 10,
    isCompleted: true,
    questionAmount: 20,
    winningChance: 100,
    winningStatus: true,
    winnerAmount: 3,
    formIsReported: false,
  },
  {
    id: "form456",
    creatorId: "creator456",
    title:
      "Consumer Behavior and Preferences Study: Insights for Product Development at Amazon",
    prize: 15000,
    prizeType: "LUCKY",
    maxWinner: 2,
    createdAt: "2024-03-15T12:00:00",
    updatedAt: "2024-03-15T12:00:00",
    endedAt: "2024-03-17T12:00:00",
    ongoingParticipation: 0,
    completedParticipation: 5,
    questionFilled: 25,
    isCompleted: true,
    questionAmount: 25,
    winningChance: 17.2342835,
    winningStatus: true, // LUCKY
    winnerAmount: 2,
    formIsReported: false,
  },
  {
    id: "form789",
    creatorId: "creator789",
    title:
      "Academic Performance and Student Well-being Assessment: A Case Study of Stanford University",
    prize: 200000,
    prizeType: "LUCKY",
    maxWinner: 1,
    createdAt: "2024-03-17T12:00:00",
    updatedAt: "2024-03-17T12:00:00",
    endedAt: "2024-03-20T12:00:00",
    ongoingParticipation: 0,
    completedParticipation: 5,
    questionFilled: 30,
    isCompleted: true,
    questionAmount: 30,
    winningChance: 10.5,
    winningStatus: false,
    winnerAmount: 1,
    formIsReported: false,
  },
  {
    id: "form234",
    creatorId: "creator234",
    title:
      "Workplace Culture and Diversity Evaluation: Examining Google’s Inclusive Practices",
    prize: 100,
    prizeType: "EVEN",
    maxWinner: 5,
    createdAt: "2024-03-17T12:00:00",
    updatedAt: "2024-03-17T12:00:00",
    endedAt: "2024-03-19T12:00:00",
    ongoingParticipation: 0,
    completedParticipation: 5,
    questionFilled: 30,
    isCompleted: true,
    questionAmount: 30,
    winningChance: 100,
    winningStatus: true,
    winnerAmount: 5,
    formIsReported: false,
  },
  {
    id: "form567",
    creatorId: "creator567",
    title:
      "Impact of Digital Learning Tools on Student Success: A Research Study at Coursera",
    prize: 1000000,
    prizeType: "LUCKY",
    maxWinner: 1,
    createdAt: "2024-03-19T12:00:00",
    updatedAt: "2024-03-19T12:00:00",
    endedAt: "2024-03-20T12:00:00",
    ongoingParticipation: 0,
    completedParticipation: 5,
    questionFilled: 30,
    isCompleted: true,
    questionAmount: 30,
    winningChance: 17.3538,
    winningStatus: false,
    winnerAmount: 1,
    formIsReported: false,
  },
];

export const listFAQ = [
  {
    trigger: "Question 1 Sample",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    trigger: "Question 2 Sample",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    trigger: "Question 3 Sample",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    trigger: "Question 4 Sample",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    trigger: "Question 5 Sample",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    trigger: "Question 6 Sample",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    trigger: "Question 7 Sample",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

export const SHOP_IMAGE = [
  "https://res.cloudinary.com/dfeiw5txq/image/upload/f_auto,q_auto/v1/questify/t0d4ej4vgdcwat4axh1w",
  "https://res.cloudinary.com/dfeiw5txq/image/upload/f_auto,q_auto/v1/questify/wfpzalfbqoqjdffgr0nf",
  "https://res.cloudinary.com/dfeiw5txq/image/upload/f_auto,q_auto/v1/questify/e8mioxl5zsxkfvsv4htt",
  "https://res.cloudinary.com/dfeiw5txq/image/upload/f_auto,q_auto/v1/questify/rbefqvlej3svjp932bdd",
];

export const CreatorInfo = [
  "First Name",
  "Last Name",
  "Gender",
  "Email",
  "Phone Number",
  "Company",
];

export const RespondentInfo = [
  "First Name",
  "Last Name",
  "Gender",
  "Email",
  "Phone Number",
  "Company",
];

export const steps = [
  {
    target: "body",
    content:
      "This is your workspace. You can create, edit, and publish your questionnaire here.",
    disableBeacon: true,
    nextButton: { enabled: true, position: "end" },
  },
  {
    target: "#form-left-menu",
    content:
      "This is the left menu. You can navigate between the opening, contents, and ending sections of your questionnaire.",
    disableBeacon: true,
  },
  {
    target: "#form-opening",
    content:
      "This is the opening section. You can add a welcome message or instructions for your questionnaire here.",
    disableBeacon: true,
  },
  {
    target: "#delete-question",
    content:
      "You can delete the current question by clicking on the trash icon.",
    disableBeacon: true,
  },
  {
    target: "#duplicate-question",
    content:
      "You can duplicate the current question by clicking on the copy icon.",
    disableBeacon: true,
  },
  {
    target: "#move-up-question",
    content:
      "You can move the current question up by clicking on the up arrow icon.",
    disableBeacon: true,
  },
  {
    target: "#move-down-question",
    content:
      "You can move the current question down by clicking on the down arrow icon.",
    disableBeacon: true,
  },
];
