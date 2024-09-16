# SalonMaster Frontend
## Description du Projet
Ce projet a été réalisé dans le cadre de ma formation et vise à développer l'interface frontend d'une application web destinée à un salon de beauté. L'objectif est de permettre aux gérants de salons de beauté de saisir leur chiffre d'affaires et d'obtenir des statistiques sur leur positionnement parmi leurs concurrents.
## Fonctionnalités principales :
1. **Inscription et confirmation de compte par email** :
   Le gérant peut s'inscrire via un formulaire. Une fois l'inscription soumise, un email de confirmation est envoyé avec un lien pour valider le compte.
2. **Connexion avec Token JWT** :
   Le gérant peut se connecter à l'aide d'un formulaire de login, et un token JWT est stocké pour gérer l'authentification sécurisée de l'utilisateur.
3. **Espace Personnel** :
   Le gérant a accès à son espace personnel où il peut :
    - Mettre à jour et afficher ses informations personnelles en temps réel.
    - Saisir le chiffre d'affaires mensuel et visualiser l'historique de ses saisies.
4. **Statistiques de positionnement** :
   - Calcul de la moyenne des chiffres d'affaires pour l'utilisateur.
   - Comparaison avec la moyenne des autres salons au niveau national, régional et départemental.
5. **Réinitialisation de Mot de Passe** :
   - Demander la réinitialisation de Mot de Passe
   - Recevoir un e-mail avec un lien de réinitialisation pour accéder à un formulaire sécurisé.
   - Soumettre le nouveau mot de passe avec le token de réinitialisation.
## Technologies utilisées : 
- **Angular Version 18.1.0**
- **Bootstrap version 5.3.3**
- **HTML**
- **CSS**
- **TypeScript**
- **JWT**
## Structure du projet : 
- src/app/components/header : Composant pour la barre de navigation (header).
- src/app/components/footer : Composant pour le bas de page (footer).
- src/app/components/home : Composant pour le contenu de la page d'accueil
- src/app/components/register : Composant pour la page d'inscription.
- src/app/components/login : Composant pour la page de connexion.
- src/app/components/thanks : Composant pour la redirection vers la page de remerciement
- src/app/components/confirm-account : Composant pour la redirection vers la page de confirmation de compte
- src/app/components/update-password : Composant pour la page de réinitialisation de mot de passe
- src/app/components/personal-space : Espace personnel avec profil et chiffres d'affaires.
- src/app/components/profile : Mettre à jour et afficher ses informations personnelles en temps réel
- src/app/components/ca-history : Historique des chiffres d'affaires et saisie des nouveaux CA sur l'espace personnel.
- src/app/components/stats : composant pour le calcul de la moyenne des chiffres d'affaires
- src/app/services : Services pour la gestion des données et la communication avec le backend
-  src/app/interfaces : Définition des types et structures de données utilisés

## Installation : 
Avant de commencer, s'assurer d'avoir les outils suivants : Node.js, Angular CLI, Git, IDE

1. **Cloner le Dépôt** :
  Exécution de la commande suivante pour cloner le dépôt depuis GitHub:

   ```powershell
   git clone https://github.com/AsmaELEUCHI/SalonMaster_frontend.git

   

2. **Accéder au Dossier du Projet** :

   ```powershell
   cd SalonMaster_frontend

   ```

3. **Installer les Dépendances** :

   ```powershell
   npm install

   ```

4. **Lancer le serveur de développement** :
   ```powershell
   ng serve
   ```

Une fois le serveur démarré, ouvrez le navigateur et accédez à l'adresse suivante pour voir l'application en fonctionnement :
http://localhost:4200/

## Backend
Pour le développement et les détails de la partie backend : https://github.com/AsmaELEUCHI/SalonMaster_backend.git


