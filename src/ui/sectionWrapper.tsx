import React from "react";

export default function SectionWrapper() {
  return (
    <section>
      <h2>Section Wrapper</h2>
    </section>
  );
}

/* export default function SectionWrapper({
  children,
  id,
  className = "",
  variant = "default",
}) {
  const variantStyles = {
    default: "bg-white text-gray-900",
    light: "bg-gray-50 text-gray-900",
    dark: "bg-gray-900 text-white",
  };

  return (
    <section
      id={id}
      className={`${variantStyles[variant]} py-16 px-4 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        {children}
      </div>
    </section>
  );
} */
