export type InputProps = {
  placeholder: string;
  img: string;
  value: string;
};
export type errorsState = {
  errorPassword: boolean;
  errorUsername: boolean;
  errorCompanyName: boolean;
  errorPasswordRepeat: boolean;
  errorUserNotFound: boolean;
  errorUserPassword: boolean;
};

export type userState = {
  username: string;
  password: string;
  repeatPassword: string;
  companyName: string;
  subscribeVacanciesID: Array<number>;
  publishedVacanciesID: Array<number>;
  role: string;
};

export type ModalProps = {
  name: string;
  action: string;
  title: string;
  href: string;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => Promise<void>;
};

export type SignupProps = {
  children?: React.ReactNode;
};

export type IconSidebarProps = {
  src: string;
  title: string;
  href: string;
  hash?: string;
};

export type Vacancies = {
  id: number;
  title: string;
  description: string;
  companyName: string;
  location: string;
  salary: number;
  englishLvl: string;
  grade: string;
  tags: string;
  is_active: boolean;
  experience: string;
  skills: string;
  employmentType: string;
  category_id: string;
  subscribe: number;
};

export type VacanciesState = {
  vacancies: Vacancies[];
  loading: boolean;
};

export type VacancyCardProps = {
  data: Vacancies;
  title: string;
};

export type MyVacanciesProps = {
  title: string;
  description: string;
};
