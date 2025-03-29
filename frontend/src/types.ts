export type InputProps = {
  placeholder: string;
  img: string;
  value: string;
};

export type memberState = {
  username: string;
  password: string;
  repeatPassword: string;
  companyName: string;
  role: string;
  errorPassword: boolean;
  errorUsername: boolean;
  errorCompanyName: boolean;
}

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
};
