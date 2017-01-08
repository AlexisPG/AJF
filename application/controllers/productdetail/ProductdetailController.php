<?php

/**
 * Created by PhpStorm.
 * User: wap61
 * Date: 29/11/16
 * Time: 17:28
 */
class ProductdetailController
{
    public function httpGetMethod(Http $http, array $queryFields)
    {
        $model = new ProductModel();

        // Récupère 1 produit
        $product = $model->findOne($queryFields['id']);

        // Envoie les données au format JSON
        $addProduct = $http->sendJsonResponse($product);
        
    }
}