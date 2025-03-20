export type InputProps = {
  placeholder: string;
  img: string;
};

export type ModalProps = {
  name: string;
  action: string;
  title: string;
  href: string;
  children?: React.ReactNode;
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
