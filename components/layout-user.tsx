type LayoutProps = {
  children: React.ReactNode;
};

export default function LayoutUser({ children }: LayoutProps) {
  return <main>{children}</main>;
}
