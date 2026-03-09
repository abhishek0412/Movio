interface AlertProps {
  variant?: "danger" | "warning" | "info" | "success";
  message: string;
}

export const Alert = ({ variant = "danger", message }: AlertProps) => {
  return (
    <div className={`alert alert-${variant}`} role="alert">
      {message}
    </div>
  );
};
