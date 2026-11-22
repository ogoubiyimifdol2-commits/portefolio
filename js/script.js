/* =========================================================
   Portfolio : petit script (thème clair/sombre + formulaire)
   ========================================================= */
(function () {
  "use strict";

  var racine = document.documentElement;
  var bouton = document.getElementById("theme-toggle");

  /* ---------- Thème clair / sombre ---------- */
  function appliquerTheme(theme) {
    racine.setAttribute("data-bs-theme", theme);
    if (!bouton) return;
    var icone = bouton.querySelector("i");
    if (theme === "dark") {
      icone.className = "bi bi-sun-fill";
      bouton.setAttribute("aria-label", "Passer au thème clair");
    } else {
      icone.className = "bi bi-moon-fill";
      bouton.setAttribute("aria-label", "Passer au thème sombre");
    }
  }

  var themeInitial = "dark";
  try {
    var sauvegarde = localStorage.getItem("theme");
    if (sauvegarde === "light" || sauvegarde === "dark") themeInitial = sauvegarde;
  } catch (e) { /* stockage indisponible : on garde le thème sombre */ }
  appliquerTheme(themeInitial);

  if (bouton) {
    bouton.addEventListener("click", function () {
      var nouveau = racine.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
      appliquerTheme(nouveau);
      try { localStorage.setItem("theme", nouveau); } catch (e) { /* ignoré */ }
    });
  }

  /* ---------- Menu : se referme après un clic sur un lien (mobile) ---------- */
  var menu = document.getElementById("menu-principal");
  if (menu) {
    menu.querySelectorAll(".nav-link").forEach(function (lien) {
      lien.addEventListener("click", function () {
        if (menu.classList.contains("show")) {
          bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
      });
    });
  }

  /* ---------- Lien actif dans le menu selon la section visible ---------- */
  var sections = ["introduction", "cv", "projets", "contact"].map(function (id) {
    return document.getElementById(id);
  });
  var liens = document.querySelectorAll("#menu-principal .nav-link");

  function mettreAJourMenu() {
    var repere = window.scrollY + window.innerHeight * 0.35;
    var courante = sections[0];
    sections.forEach(function (section) {
      if (section && section.offsetTop <= repere) courante = section;
    });
    // en bas de page, on active la dernière section (Contact)
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      courante = sections[sections.length - 1];
    }
    liens.forEach(function (lien) {
      var actif = lien.getAttribute("href") === "#" + courante.id;
      lien.classList.toggle("active", actif);
      if (actif) lien.setAttribute("aria-current", "true");
      else lien.removeAttribute("aria-current");
    });
  }
  window.addEventListener("scroll", mettreAJourMenu, { passive: true });
  window.addEventListener("resize", mettreAJourMenu);
  mettreAJourMenu();

  /* ---------- Barre de progression, menu, bouton retour en haut ---------- */
  var barre = document.querySelector(".scroll-progress");
  var barreNav = document.querySelector(".site-nav");
  var haut = document.querySelector(".to-top");

  function surDefilement() {
    var total = document.documentElement.scrollHeight - window.innerHeight;
    var part = total > 0 ? window.scrollY / total : 0;
    if (barre) barre.style.transform = "scaleX(" + Math.min(1, Math.max(0, part)) + ")";
    if (barreNav) barreNav.classList.toggle("scrolled", window.scrollY > 20);
    if (haut) haut.classList.toggle("show", window.scrollY > 600);
  }
  window.addEventListener("scroll", surDefilement, { passive: true });
  window.addEventListener("resize", surDefilement);
  surDefilement();

  /* ---------- Apparition des blocs au défilement ---------- */
  var reduit = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduit) {
    var cibles = document.querySelectorAll(
      ".section-title, .section-sub, #cv .col-lg-6, #projets .row > div, #contact .row > div"
    );
    var observateur = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (entree) {
        if (entree.isIntersecting) {
          entree.target.classList.add("visible");
          observateur.unobserve(entree.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    cibles.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.setProperty("--d", (i % 3) * 90 + "ms");
      observateur.observe(el);
    });
  }

  /* ---------- Formulaire de contact ----------
     Pas de serveur : on ouvre la messagerie de la personne avec le message prêt. */
  var DESTINATAIRE = "ogoubiyimifdol2@gmail.com";
  var formulaire = document.getElementById("form-contact");

  if (formulaire) {
    formulaire.addEventListener("submit", function (evenement) {
      evenement.preventDefault();
      formulaire.classList.add("was-validated");
      if (!formulaire.checkValidity()) return;

      var nom = formulaire.nom.value.trim();
      var email = formulaire.email.value.trim();
      var message = formulaire.message.value.trim();

      var sujet = "Message depuis votre portfolio - " + nom;
      var corps = message + "\n\n" + nom + "\n" + email;
      window.location.href = "mailto:" + DESTINATAIRE +
        "?subject=" + encodeURIComponent(sujet) +
        "&body=" + encodeURIComponent(corps);
    });
  }
})();
