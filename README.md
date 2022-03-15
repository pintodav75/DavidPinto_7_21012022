# DavidPinto_7_21012022
Projet 07 Openclassrooms - Groupomania
# P7 - Créez un réseau social d’entreprise

## Compétences évaluées

-   Gérer un stockage de données à l'aide de SQL

-   Personnaliser le contenu envoyé à un client web

-   Implémenter un stockage de données sécurisé en utilisant SQL

-   Authentifier un utilisateur et maintenir sa session

# Installez l'application de Groupomania

# Backend

Le backend a été crée avec **Node.js**, **Express.js** et **MySQL** comme base de données.
<br />
Pour simplifier l'utilisaiton du back nous allons utiliser Docker.

### Installation
-   Clonez le repo dans un dossier puis ouvrez le sur VS code.
    <br />
-   Dans le terminal de VSCODE, situez-vous dans le dossier `/backend`.
    <br />
-   Démarrer `npm install` pour installer toutes les dependencies du backend.
    <br />
-   Dans le fichier `.env`, veuillez rentrer votre string secret pour le token.
    <br />
-   Écrivez dans la ligne de commande "npx sequelize-cli db:migrate" pour configurer la base de données.

### Development server

Toujours depuis le dossier backend, executer la commande `make up-node` pour avoir accès au serveur de développement. L'application va se recharger automatiquement si vous modifiez un fichier source. Puis executer `make up-mysql` pour lancer notre BDD.
Ces deux commandes seront executer dans des containers grace a docker.

# Frontend

Le frontend a été crée avec React.js

### Installation

Dans le dossier `/frontend` démarrez `npm install` pour installer toutes les dépendances du frontend.

### Development server

Démarrer `npm start` pour avoir accès au serveur de développement. L'application va se recharger automatiquement si vous modifiez un fichier source.

