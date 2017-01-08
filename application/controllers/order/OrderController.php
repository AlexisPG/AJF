<?php

/**
 * Created by PhpStorm.
 * User: wap61
 * Date: 28/11/16
 * Time: 15:26
 */
class OrderController
{
    public function httpGetMethod(Http $http, array $queryFields)
    {
        $model = new ProductModel();
        $products = $model->findAll();
        return [
            'products' => $products,
            'flashBag' => new FlashBag()
        ];
    }
    public function httpPostMethod(Http	$http, array $formFields)
    {

    }
}