export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-body-tertiary text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-0 text-body-secondary">
          &copy; {currentYear} Movio. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
