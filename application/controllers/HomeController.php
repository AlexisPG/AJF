<?php

/**
 * Created by PhpStorm.
 * User: wap61
 * Date: 23/11/16
 * Time: 16:14
 */
class HomeController
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
}