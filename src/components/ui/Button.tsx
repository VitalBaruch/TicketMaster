type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline";
  type?: "button" | "submit" | "reset";
};

export function Button({ children, onClick, variant = "primary", type = "button" }: Props) {
  const base =
    "px-4 py-2 rounded-full text-sm font-medium transition focus:outline-none";
  const styles = {
    primary: "bg-sky-500 hover:bg-sky-400 text-white",
    outline:
      "border border-slate-600 hover:border-sky-500 text-slate-200 hover:text-sky-300",
  };

  return (
    <button className={`${base} ${styles[variant]}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
