<?php

/**
 * Created by PhpStorm.
 * User: wap61
 * Date: 29/11/16
 * Time: 12:04
 */
class ProductController
{
    public function httpGetMethod(Http $http, array $queryFields)
    {
        $model = new ProductModel();

        // Récupère 1 produit
        $product = $model->findOne($queryFields['id']);

        //Affiche le template avec le produit
        return [
            '_raw_template' => true,
            'product' => $product
        ];
    }
}