var BasketException = function(message)
{
    this.message = message;
};

var Basket = function()
{
    this.loadProducts();
};

/**
 * Méthode appelée lorsque l'on clique sur le bouton "Ajouter"
 *
 * @param event
 */
Basket.prototype.addProduct = function(event)
{
    //On annule l'événement (pas de soumission du formulaire)
    event.preventDefault();

    //On récupère le numéro du produit dans le champ select
    var productId = $("#meal").val();

    //On envoie une requête ajax avec ce numéro pour récupérer les informations de ce produit
    $.get(getRequestUrl() + "/product/detail", {id: productId}, this.getProductDetail.bind(this), 'json');
};

/**
 * Ajoute le produit dans le localstorage à partir des informations du produit sélectionné
 *
 * @param product Les informations sur le produit récupérées au format JSON
 */
Basket.prototype.getProductDetail = function(product)
{
    //On essaie de réaliser le code suivant
    try
    {
        //Chargement des produits depuis le localstorage
        var products = loadDataFromDomStorage('cart');

        //Booléen qui va nous permettre de savoir si le produit existe déjà dans le panier
        //afin de gérer correctement la quantité
        var productFound = false;

        //Récupération de la quantité sélectionnée (parsée en float pour éviter les problèmes de concaténation)
        product.quantitySelected = parseFloat($("#quantity").val());

        //Si la quantité sélectionnée est inférieure ou égale à 0 on lance une exception
        if(product.quantitySelected <= 0)
        {
            throw new BasketException("Il faut ajouter au-moins 1 produit !")
        }

        //Si le panier est vide on initialise un tableau vide
        //(le localstorage retourne la valeur null s'il n'existe pas)
        if (products == null)
        {
            products = [];
        }

        //On parcourt la liste des produits du panier
        for (var i = 0; i < products.length; i++)
        {
            //Si le produit a été trouvé
            if (products[i].Id == product.Id) // TODO : qu'est que Id ?
            {
                //On met à jour sa quantité
                products[i].quantitySelected += product.quantitySelected;

                //On vérifie que la quantité totale n'excède pas le stock
                //On lance une exception si elle la dépasse
                if (products[i].quantitySelected > product.QuantityInStock) {
                    throw new BasketException("La quantité est supérieure au stock !");
                }

                //On prévient que le produit a été trouvé
                productFound = true;

                //Et on arrête de parcourir le tableau car on a trouvé ce que l'on cherchait
                break;
            }
        }

        //Si le produit n'a pas été trouvé on l'ajoute au panier
        if (!productFound)
        {
            //On vérifie que la quantité totale n'excède pas le stock
            //On lance une exception si elle la dépasse
            if(product.quantitySelected > product.QuantityInStock)
            {
                throw new BasketException("La quantité est supérieure au stock !");
            }

            products.push(product);
        }

        //On cache le message d'erreur (au cas où il aurait été affiché suite à une erreur)
        this.hideFormError();

        //On met à jour la liste des produits dans le localstorage
        saveDataToDomStorage('cart', products);

        //On charge le tableau avec la liste des produits sur la page
        this.loadProducts();
    }
    catch(exception) //exception est l'exception attrapée
    {
        //Si une erreur a été trouvée on l'affiche dans un message d'erreur
        this.showFormError(exception.message);
    }
};

/**
 * Chargement de tous les produits
 */
Basket.prototype.loadProducts = function()
{
    //On récupère la liste des produits du panier à partir du localstorage
    var products = loadDataFromDomStorage('cart');
    var table = $('#order-summary table tbody');

    //On vide le tableau avant de le recréer
    table.empty();

    //On ajoute dans notre tableau une ligne pour chaque produit (un <tr>)
    //Puis une cellule (td) pour chaque information du produit
    //La dernière cellule contiendra un bouton avec un data-id = valeur de l'id du produit
    for(var i = 0; i < products.length; i++)
    {
        table.append($('<tr>')
            .append($('<td>').addClass('number').text(products[i].quantitySelected))
            .append($('<td>').text(products[i].Name))
            .append($('<td>').addClass('number').text(formatMoneyAmount(products[i].SalePrice)))
            .append($('<td>').addClass('number').text(formatMoneyAmount(products[i].SalePrice * products[i].quantitySelected)))
            .append($('<td>').append($('<button>').addClass('button').addClass('button-cancel').data('id', products[i].Id).append($('<i>').addClass('fa').addClass('fa-trash')))));

    }
}

/**
 * Supprimer un produit du localstorage puis affiche le nouveau panier
 *
 * @param event Clic sur le bouton
 */
Basket.prototype.onRemoveProduct = function(event)
{
    //On récupère la liste des produits du panier à partir du localstorage
    var products = loadDataFromDomStorage('cart');

    //On récupère la valeur du data-id sur l'élément sur lequel on a cliqué
    //event.target correspond à cet élément
    var productId = $(event.target).data('id');

    //Je parcours tous les produits
    for(var i = 0; i < products.length; i++)
    {
        //Dès que j'ai trouvé le produit que je veux supprimer
        if(products[i].Id == productId)
        {
            //Je le supprime du tableau
            products.splice(i, 1);

            //Et je sors de la boucle
            break;
        }
    }

    //J'ajoute mon nouveau tableau (avec un élément en moins) dans le localstorage
    saveDataToDomStorage('cart', products);

    //Et je charge de nouveau la liste des produits du panier car elle a changé
    this.loadProducts();
};

/**
 * Affiche le message d'erreur
 *
 * @param message Le message de l'erreur
 */
Basket.prototype.showFormError = function(message)
{
    $("#error-message p").text(message);
    $("#error-message").fadeIn();
};

/**
 * Cache le message d'erreur
 *
 */
Basket.prototype.hideFormError = function()
{
    $("#error-message p").text();
    $("#error-message").fadeOut();
}