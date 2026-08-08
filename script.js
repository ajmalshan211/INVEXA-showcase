"use strict";

document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-button");
    const navigation = document.querySelector(".site-navigation");
    const navigationLinks = Array.from(
        document.querySelectorAll('.site-navigation a[href^="#"]')
    );
    const revealElements = document.querySelectorAll("[data-reveal]");
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    const closeMenu = (returnFocus = false) => {
        if (!menuButton || !navigation) {
            return;
        }

        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
        document.body.classList.remove("menu-open");

        if (returnFocus) {
            menuButton.focus();
        }
    };

    const openMenu = () => {
        if (!menuButton || !navigation) {
            return;
        }

        navigation.classList.add("open");
        menuButton.setAttribute("aria-expanded", "true");
        menuButton.setAttribute("aria-label", "Close navigation");
        document.body.classList.add("menu-open");
    };

    const topLinks = document.querySelectorAll('a[href="#top"]');

topLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: reducedMotion.matches ? "auto" : "smooth"
        });

        closeMenu();
    });
});

    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            const isOpen =
                menuButton.getAttribute("aria-expanded") === "true";

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        navigationLinks.forEach((link) => {
            link.addEventListener("click", () => closeMenu());
        });

        document.addEventListener("keydown", (event) => {
            if (
                event.key === "Escape" &&
                navigation.classList.contains("open")
            ) {
                closeMenu(true);
            }
        });

        document.addEventListener("click", (event) => {
            if (
                navigation.classList.contains("open") &&
                !navigation.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                closeMenu();
            }
        });
    }

    const showAllRevealElements = () => {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    };

    if (
        reducedMotion.matches ||
        !("IntersectionObserver" in window)
    ) {
        showAllRevealElements();
    } else {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                rootMargin: "0px 0px -10% 0px",
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    }

    const sectionLinks = navigationLinks
        .map((link) => {
            const targetId = link.getAttribute("href").slice(1);
            const section = document.getElementById(targetId);

            return section ? { link, section } : null;
        })
        .filter(Boolean);

    const setActiveLink = (activeSectionId) => {
        sectionLinks.forEach(({ link, section }) => {
            const isActive = section.id === activeSectionId;

            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    };

    if (
        sectionLinks.length &&
        "IntersectionObserver" in window
    ) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                const visibleSections = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            b.intersectionRatio -
                            a.intersectionRatio
                    );

                if (visibleSections.length) {
                    setActiveLink(
                        visibleSections[0].target.id
                    );
                }
            },
            {
                rootMargin: "-28% 0px -58% 0px",
                threshold: [0, 0.2, 0.5]
            }
        );

        sectionLinks.forEach(({ section }) => {
            sectionObserver.observe(section);
        });
    }

    const yearElement =
        document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = String(
            new Date().getFullYear()
        );
    }
});