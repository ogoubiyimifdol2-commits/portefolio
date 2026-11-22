# Portfolio d'Ogoubiyi Abdoul Mifdol Folahanmi Adio Fiacre

Portfolio personnel en une seule page, fait avec **HTML5, Bootstrap 5 et un peu de JavaScript**.
Aucune installation ni connexion internet n'est nécessaire : Bootstrap est déjà dans le dossier `vendor/`.

## Ouvrir le portfolio

1. Décompresse le dossier (si tu as reçu un .zip).
2. Double-clique sur **`index.html`**. Il s'ouvre dans ton navigateur (Chrome, Edge, Firefox…).

## Structure du dossier

```
portfolio/
├── index.html        ← le contenu de la page (textes, sections)
├── css/style.css     ← les couleurs et le design
├── js/script.js      ← thème clair/sombre, menu, formulaire
├── images/           ← ta photo et les images des projets
├── vendor/           ← Bootstrap 5 et ses icônes (ne pas modifier)
└── README.md
```

## Modifier tes informations

Tout se change dans **`index.html`** (ouvre-le avec un éditeur comme VS Code ou le Bloc-notes) :

| Ce que tu veux changer | Où chercher dans `index.html` |
|---|---|
| Nom, titre, accroche | section `<!-- INTRODUCTION -->` (le `<h1>` est ton nom) |
| Photo | remplace `images/photo-profil.jpg` par ta nouvelle photo (même nom de fichier) |
| Formation, expériences | section `<!-- CV -->` |
| Compétences | liste `<ul class="tags">` dans la section CV |
| Projets | section `<!-- PROJETS -->` : une carte `<article class="card project-card">` par projet |
| E-mail, GitHub | section `<!-- CONTACT -->` et `<footer>` (cherche `ogoubiyimifdol2`) |

### Ajouter un projet

Copie une carte entière (de `<div class="col-md-6 col-xl-5">` jusqu'à son `</div>` de fin), colle-la à la suite,
puis change le titre, la description, les technologies et le lien GitHub. Ajoute l'image dans `images/`.

### Ajouter LinkedIn

Dans la section Contact, ajoute dans la liste `contact-list` :

```html
<li>
  <i class="bi bi-linkedin" aria-hidden="true"></i>
  <a href="https://www.linkedin.com/in/TON-PROFIL" target="_blank" rel="noopener noreferrer">LinkedIn</a>
</li>
```

### Changer les couleurs

Dans `css/style.css`, en haut du fichier : modifie `--accent` (l'orange) et `--bg` (le fond). Le dégradé du nom et des titres est dans `--grad`, plus bas dans le même fichier.
Il y a un bloc pour le thème sombre et un pour le thème clair.

## Formulaire de contact

Le portfolio n'a pas de serveur : quand un visiteur clique sur « Envoyer le message »,
sa messagerie s'ouvre avec le message prêt à partir vers ton adresse e-mail.
Pour changer l'adresse de destination, modifie `DESTINATAIRE` dans `js/script.js`.

## Mettre en ligne (facultatif)

Dépose le dossier sur GitHub Pages, Netlify ou Vercel : c'est un site statique, il fonctionne tel quel.

## Vidéo de présentation

[Voir la vidéo de présentation]https://drive.google.com/file/d/1LE9u_IhNf8Kd5aEj33fYUZzHUInHU-iH/view?usp=drive_link

