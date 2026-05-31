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

  const revealVisibleSections = () => {
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.08) {
        revealSection(section);
      }
    });
  };

  requestAnimationFrame(revealVisibleSections);
  window.addEventListener("load", revealVisibleSections, { once: true });

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
    sections.forEach((section) => section.classList.add("is-visible"));
  }
}
