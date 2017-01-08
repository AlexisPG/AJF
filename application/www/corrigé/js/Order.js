var Order = function()
{

};

Order.prototype.onSelectProduct = function()
{
    //Lorsque je sélectionne un produit, je récupère la valeur de son id
    var productId = $("#meal").val();

    //J'envoie une requête ajax vers ProductController avec l'id du produit
    //pour lequel je veux récupérer les informations
    $.get(getRequestUrl() + '/product', {id: productId}, this.getProduct)
};

Order.prototype.getProduct = function(data)
{
    //Les informations sont récupérées au format HTML car le serveur a affiché du HTML
    //J'insère ce HTML dans ma page dans l'élément #meal-details
    //Tout son contenu sera donc remplacé
    $("#meal-details").html(data);
};