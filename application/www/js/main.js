'use strict';
var BasketException = function(message)
{
    this.message = message;
};

var Basket = function()
{
    this.loadCart(cart);
};


// ------------- CODE PRINCIPAL et évenements
$(function () {

    //Fonction AJAX

    // Action : Sélection d'un produit dans le menu déroulant
    $("#productList").on("change", onSelectProduct);
    // Au clic sur le <select>, apparition de la div + quantity
    $('.hide-product').hide();

    // Action : Au clic sur Ajouter
    $("#add-product").on("click", onSummary);
    // Au clic sur le bouton Ajouter, apparition du récap
    $('.hide-summary').hide();

    // Action : Suppresion d'un produit
    // Evenement généré sur un element dynamique
    $("#product-added").on("click", ".delete-product", onDeleteOneProduct);

    // Action : Suppresion de tous les produits
    $("#delete-all").on("click", onDeleteAllProducts);

    // Action : Validation du formulaire
    $("#validate-form").on("click", onValidateForm);

    // Affichage ou non du récap, si le contenu est vide ou non
    var cart = loadDataFromDomStorage('cart');

    if (cart == null) {
        cart = [];
    }

    loadCart(cart);
});


// ---------------------------- FONCTIONS
/**
 * Action : Sélection d'un produit dans le menu déroulant
 */
function onSelectProduct() {
    // Montre le bloc
    $('.hide-product').show();

    var idProduct = $(this).val();

    $.get(getRequestUrl() + "/product", {id: idProduct}, function (data) {
        $("#target").html(data);
    });
}

/**
 * Action : Au clic sur Ajouter
 */
function onSummary(event) {
    event.preventDefault();
    // Montre le bloc
    $('.hide-summary').show();

    var idProduct = $("#productList").val();
    // Ajax
    $.get(getRequestUrl() + "/productdetail", {id: idProduct}, function (data) // Data est ce qui est présent dans la BDD
    {
        try {
            // 1. ON charge le localStorage
            var cart = loadDataFromDomStorage('cart');

            // 2. Variable permettant de savoir si il y a un produit dans le panier
            var productFound = false;

            // 3. On fait les controle, les opération, qu'on met en variabl pour le traitement au point 6.
            data.quantityChosen = parseFloat($("#quantity").val());

            // 4. Gestion des exceptions
            //    Récupération des quantités en stock
            var quantityInStock = data.quantityInStock;
            console.log("nombre de quantité en stock : " + quantityInStock);

            // A/ Quantité plus en stocks
            if (quantityInStock <= 0) {
                throw new BasketException("Il n'y a plus de quantité disponible pour ce produits")
            }

            // B/ Quantités demandées négatives
            if (data.quantityChosen <= 0) {
                throw new BasketException("Il faut ajouter au moins un produit");
            }

            // C/ Si les quantités commandés sont supérieures à celles en stock
            if (data.quantityChosen > quantityInStock) 
            {
                throw new BasketException("Nous n'avons pas assez de produits disponibles en stock.")
            }

            // 5. On créé un tableau vide
            // Si le panier est vide on initialise un tableau vide
            // (le localstorage retourne la valeur null s'il n'existe pas)
            if (cart == null) 
            {
                cart = [];
            }
            // TODO / A corriger à partir d'ici
            // Rassembler les quantités des produits similaires
            for (var i = 0; i < cart.length; i++) 
            {
                // Si le produit a été trouvé 
                if(cart[i].id == data.id)
                {
                    // On met à jour sa quantité
                    cart[i].quantityChosen += data.quantityChosen;
                    
                    // On vérifie que la quantité totale n'excède pas le stock
                    // On lance une exception si elle la dépasse
                    if (cart[i].quantityChosen > data.quantityInStock)
                    {
                        throw new BasketException("La quantité est supérieure au stock !");
                    }

                    // On prévient que le produit a été trouvé
                    productFound = true;

                    // Et on arrête de parcourir le tableau car on a trouvé ce que l'on cherchait
                    break;
                }
            }

            // Si le produit n'a pas été trouvé on l'ajoute au panier
            if (!productFound)
            {
                //On vérifie que la quantité totale n'excède pas le stock
                //On lance une exception si elle la dépasse
                if (data.quantityChosen > data.quantityInStock)
                {
                    throw new BasketException("La quantité est supérieure au stock");
                }

                cart.push(data);
            }
            //On cache le message d'erreur (au cas où il aurait été affiché suite à une erreur)
            this.hideFromError();

            //On met à jour la liste des produits dans le localstorage
            saveDataToDomStorage('cart', cart);

            // On charge le tableau avec la liste des produits sur la page
            // Boucle permettant d'afficher toutes les infos dans le tableau récap
            loadCart(cart);

        }
        catch (exception) //Correspond à l'exception attrapée
        {

            // SI une erreur a été trouvée, on l'affiche dans un message d'erreur
            showFormError(exception.message);
        }

    }, "json");
}

/**
 * // Action : Validation du formulaire
 */
function onValidateForm(event)
{
    event.preventDefault();
    // 1. ON charge le localStorage
    var cart = loadDataFromDomStorage('cart');
    
    $.post(getRequestUrl() + "/ordervalidation", {cart:cart}, function (data) // Data est ce qui est présent dans la BDD
    {
        if(data.success)
        {
            localStorage.clear(); // Suppression du panier
            location.assign(getRequestUrl() + '/prder/valdate?id=' + data.orderId)
        }
            
    });
}

//    -------------- FONCTIONS APPELÉES


/**
 * Chargement du panier récap
 * @param cart
 */
function loadCart(cart) {
    // 5. On empeche la redondance
    $("#product-added").empty();

    if (cart.length == 0) {
        $('.hide-summary').hide();
    }
    else {
        for (var i = 0; i < cart.length; i++) {
            // Afficher des info depuis le localStorage
            var tr = $("<tr>");
            var td;
            // Quantité
            td = $("<td>").text(cart[i].quantityChosen);
            tr.append(td);
            // Nom produit
            td = $("<td>").text(cart[i].name);
            tr.append(td);
            // Prix unitaire
            td = $("<td>").text(formatMoneyAmount(cart[i].salePrice));
            tr.append(td);
            // Prix total
            td = $("<td>").text(formatMoneyAmount(cart[i].salePrice * cart[i].quantityChosen));
            tr.append(td);
            // Suppression
            // TODO : mettre l'icone de la poubelle / supression
            td = $("<td>")
                .append((
                        $("<a>")
                            .addClass("delete-product")
                            .attr('href', '#')
                            // AJout d'un data pour la suppression
                            .data("id", i)
                    )
                        .append(
                            $("<i>")
                                .addClass("fa")
                                .addClass("fa-times")
                                .addClass("button-delete-product")
                        )
                );
            tr.append(td);
            // Passage à la ligne prochaine
            $("#product-added").append(tr);

        }

        $('.hide-summary').show();
    }
}
/**
 * Suppression de tous les produits
 * @param event
 */
function onDeleteAllProducts(event) {
    event.preventDefault();
    //On vide le localStorage
    localStorage.clear();

    //On vide la liste des contacts dans le html
    $("#product-added").empty();

    saveDataToDomStorage('cart', cart);

    loadCart(cart);
}
/**
 * suprresion d'un seul produit
 * @param event
 */
function onDeleteOneProduct(event) {
    event.preventDefault();
    // On récupère le tableau
    var cart = loadDataFromDomStorage('cart');

    // Récupération de la ligne à supprimer
    var id = $(this).data("id");

    var deleteProduct = cart.splice(id, 1);

    saveDataToDomStorage('cart', cart);

    loadCart(cart);
}

/**
 * Message d'erreurs
 */

function showFormError(message)
{
    $("#error-message p").text(message);
    $("#error-message").fadeIn();
}

/**
 * Cache le message d'erreur
 *
 */
function hideFormError ()
{
    $("#error-message p").text();
    $("#error-message").fadeOut();
}






















