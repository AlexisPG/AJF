# Projet "AlloJ'aiFaim"
## Cahier des charges
### Contexte
Le restaurant Mr Smiley souhaite permettre à ses clients de passer leurs commandes en ligne et de réserver une table directement depuis un site web. Ce site aura à vocation par la suite de permettre aux employés de gérer les commandes directement depuis un back-office.
### Type de projet
Site e-commerce
### Prestations attendues
Réalisation technique du site :
* Création de la base de données à partir des informations fournies
* Développement des fonctionnalités

### Spécifications fonctionnelles
Les fonctionnalités suivantes devront être implémentées sur le site :
1. Affichage de la carte du restaurant
2. Création d'un compte client
3. Connexion/Déconnexion au site
4. Ajout de produits au panier
5. Paiement de la commande
6. Réservation de couverts

#### Description des fonctionnalités
##### Affichage de la carte du restaurant
La carte du restaurant devra être affichée sur la page d'accueil. Elle contiendra la liste des produits du restaurant avec leur image, leur nom, leur description et leur prix HT (ce dernier sera affiché avec deux chiffres après la virgule).
##### Création d'un compte client
Un client peut s'inscrire sur un site via un bouton "Créer un compte" présent en haut du site, sous le logo du site (cf maquette). Le client devra renseigner son nom (obligatoire), prénom (obligatoire), sa date de naissance (obligatoire), son adresse (obligatoire), son code postal (obligatoire), son pays, son email (obligatoire et unique) et son mot de passe (obligatoire et d'au-moins 8 caractères). La date de création du client doit également être stockée.  

Si des erreurs surviennent lors de l'inscription (email déjà existant, mot de passe trop petit ou champs obligatoires non renseignés), le client doit être redirigé vers le formulaire avec une liste des erreurs. Sinon il est redirigé vers la page d'accueil où il pourra se connecter
##### Connexion au site
Un client peut s'authentifier sur le site via un bouton "Connexion" présent tout en haut sur le site (cf maquette). Le client se connectera à l'aide de son email et son mot de passe. Lorsque l'utilisateur se connecte, le bouton "Créer un compte" disparaît et à la place un bouton "Réserver" et un bouton "Commander" apparaissent (cf maquette). De plus le bouton "Connexion " est remplacé par un bouton "Déconnexion" (cf maquette). A des fins de statistiques, la date de dernière connexion du client doit être également stockée.  

Si des erreurs surviennent lors de la connexion (si l'email ou le mot de passe est incorrect), le client est redirigé vers la page de connexion sinon il est redirigé vers la page d'accueil.

Lorsqu'il clique sur le bouton déconnexion il revient sur la page d'accueil, le bouton "Déconnexion" est remplacé par un bouton "Connexion". Les boutons "Réserver" et "Commander" sont remplacés par le bouton "Créer un compte" (cf maquette).

##### Ajout de produits au panier
Cette page n'est accessible que si l'utilisateur est connecté. S'il essaie d'accéder à cette page sans être connecté, il doit être redirigé vers la page de connexion. 

Lorsque le client clique sur le bouton "Commander", il arrive sur une page qui lui permet d'ajouter des articles à son panier et de voir ce qu'il a dans son panier actuellement. Il peut choisir un article à ajouter ainsi que la quantité. A chaque fois qu'un produit est sélectionné, les informations (image, nom et description) doivent apparaître. Lorsque l'utilisateur clique sur le bouton "Ajouter", cela ajoute le produit au panier avec la quantité, et le panier est mis à jour.

L'ajout de produit dans le panier ne peut se faire que si le stock le permet !

##### Paiement de la commande
Cette étape n'est possible que si le client est authentifié sur le site.

Lorsque le client clique sur le bouton "Valider", cela enregistre la commande et redirige vers la page de paiement avec le récapitulatif de la commande et le détail du prix (prix HT, TVA et TTC). Lorsqu'il clique sur le bouton "Payer", le paiement est effectué (l'interface de paiement arrivera par la suite).

Avant d'enregistrer la commande, il est nécessaire de vérifier que les prix des produits sont bien ceux de la base de données et qu'ils n'ont pas été modifiés par l'utilisateur.

##### Réservation
Cette étape n'est possible que si le client est authentifié sur le site.

Le client doit préciser la date et l'heure de la réservation ainsi que le nombre de couverts puis valider. Aucun contrôle ne sera fait sur le nombre de tables disponibles dans le restaurant.

### Spécifications techniques
#### Architecture
Le projet sera développé à l'aide du framework de la 3WA. Les bibliothèques côté client utilisées seront jQuery ainsi que le fichier utilities du framework. L'architecture MVC devra être respectée et les principes de la programmation orientée objet mis en application aussi bien en php qu'en javascript.
#### Conventions de codage
* Créer une classe par fichier
* Une classe commence toujours par une majuscule (le nom d'un fichier contenant une classe aussi)
* Le nom des classes, méthodes et propriétés sera en camelCase
* Le code doit être bien indenté (utiliser le formatage automatique de l'IDE)
* Commenter suffisamment le code (PHPDOC)


