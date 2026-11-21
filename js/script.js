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
