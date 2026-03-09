import { Outlet } from "react-router-dom";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import "../../App.css";

export const Layout = () => {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Nav />
      <main id="main-content" className="container flex-grow-1 py-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
