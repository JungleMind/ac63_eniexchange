[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
<a href="https://github.com/JungleMind/ac63_eniexchange/tree/backend"> <strong>Project Link</strong> </a>

## Installation du backend

  1 cloner la branch backend du projet avec la commande : 
    <strong> git clone --branch backend https://github.com/JungleMind/ac63_eniexchange/tree/backend</strong>

  2 Lancer la commande d'installation des dépandances : 
    <strong> npm install </strong>

  3 Renommer le fichier '.env.example' en '.env' et modifier les informations, pour les informations concernant les champs smtp, 
    il vous faudra creer compte sur <a href="https://sendgrid.com/">sendgrid</a> et creer un compte qui vous servira pour envoyer des emails automatiques qui contiendront les codes d'activation des comptes d'utilisateurs.
    Voici un <a href="https://docs.sendgrid.com/fr/for-developers/sending-email/api-getting-started">lien</a> vers la documentation de sendGrid.

    -> Si vous avez des problèmes sur ce point, ne vous inquiètez pas, vous pouvez quand meme lancer le serveur backend et consulter la console pour récupérer le code d'activation décodé, pour activer votre compte utilisateur.
  
  4 Lancer mongoDB compass, veuillez vous assurer que votre service mongod est fonctionnel: <a href="https://www.mongodb.com/docs/manual/tutorial/manage-mongodb-processes/">docs</a>

  5 Lancer le serveur backend avec la commande : 
    <strong> npm run start:dev </strong>

## Auteurs
  Fabio, contact: lucfabior@gmail.com
  Maharo, contact: maharoniaina19@gmail.com

## License
Nest is [MIT licensed](LICENSE).