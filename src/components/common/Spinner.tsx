interface SpinnerProps {
  label?: string;
}

export const Spinner = ({ label = "Loading…" }: SpinnerProps) => {
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">{label}</span>
      </div>
    </div>
  );
};
