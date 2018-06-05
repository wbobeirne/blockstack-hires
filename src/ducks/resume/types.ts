export enum TypeKeys {
  SAVE = 'RESUME_SAVE',
  SAVE_SUCCESS = 'RESUME_SAVE_SUCCESS',
  SAVE_FAILURE = 'RESUME_SAVE_FAILURE',
  SAVE_LOCAL = 'RESUME_SAVE_LOCAL',
  FETCH = 'RESUME_FETCH',
  FETCH_SUCCESS = 'RESUME_FETCH_SUCCESS',
  FETCH_FAILURE = 'RESUME_FETCH_FAILURE',
}

interface Job {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description?: string;
};

interface Education {
  school: string;
  degree?: string;
  year?: string;
  gpa?: string;
  description?: string;
};

export interface Resume {
  name?: string;
  location?: string;
  phone?: string;
  email?: string;
  website?: string;
  description?: string;
  jobs?: Job[];
  education?: Education[];
  skills?: string[];
  interests?: string[];
  palette?: {
    bg: string;
    text: string;
    headerBg: string;
    headerText: string;
    timeline: string;
    listBg: string;
    listText: string;
  };
};

export interface SaveAction {
  type: TypeKeys.SAVE;
}

export interface SaveSuccessAction {
  type: TypeKeys.SAVE_SUCCESS;
  payload: Resume;
}

export interface SaveFailureAction {
  type: TypeKeys.SAVE_FAILURE;
  payload: string;
}


export interface SaveLocalAction {
  type: TypeKeys.SAVE_LOCAL;
  payload: Resume;
}


export interface FetchAction {
  type: TypeKeys.FETCH;
}

export interface FetchSuccessAction {
  type: TypeKeys.FETCH_SUCCESS;
  payload: {
    resume: Resume;
    username: string;
  },
}

export interface FetchFailureAction {
  type: TypeKeys.FETCH_FAILURE;
  payload: string;
}

export type ResumeAction =
  | SaveAction
  | SaveSuccessAction
  | SaveFailureAction
  | SaveLocalAction
  | FetchAction
  | FetchSuccessAction
  | FetchFailureAction;
