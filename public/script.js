const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const sections = [...document.querySelectorAll(".template-section")];

if (!reduceMotion.matches && sections.length) {
  document.documentElement.classList.add("motion-ready");

  const revealSection = (section) => {
    if (section.classList.contains("is-visible")) return;
    section.classList.add("is-visible");
    window.setTimeout(() => {
      section.classList.add("reveal-finished");
    }, 1450);
  };

  revealSection(sections[0]);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealSection(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -14% 0px",
        threshold: 0.16
      }
    );

    sections.forEach((section) => observer.observe(section));
  } else {
    sections.forEach((section) => {
      section.classList.add("is-visible", "reveal-finished");
    });
  }
}
