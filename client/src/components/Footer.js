import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="cs-footer bg-light mt-5 py-3">
      <p className="text-center">&copy; {year} MTP</p>
    </footer>
  );
}
