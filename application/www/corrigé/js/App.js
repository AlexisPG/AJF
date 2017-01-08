var App = function()
{
    //On crée un objet qui va gérer le panier et le formulaire de commande
    this.order = new Order();
    this.basket = new Basket();
};

App.prototype.run = function()
{
    //Initialisation des événements
    this.initEvents();
};

App.prototype.initEvents = function()
{
    $('#meal').on('change', this.order.onSelectProduct.bind(this.order));
    $('#order-form').on('submit', this.basket.addProduct.bind(this.basket));

    //Les boutons qui suppriment les éléments du panier sont créés dynamiquement
    //Donc il faut mettre l'événement sur un élément qui n'est pas créé dynamiquement
    //Et rajouter l'élément sur lequel on veut cliquer en paramètre de la méthode "on" de jQuery
    //Cf : http://api.jquery.com/on/
    $('#order-summary table').on('click', 'button', this.basket.onRemoveProduct.bind(this.basket));
};