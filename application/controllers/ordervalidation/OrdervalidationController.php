<?php

/**
 * Created by PhpStorm.
 * User: wap61
 * Date: 02/12/16
 * Time: 11:15
 */
class OrdervalidationController
{

    public function httpPostMethod(Http $http, array $formFields)
    {
//        // PAnier récupéré depuis la requête ajax
//        $cart = $formFields['cart'];
        
        // Création d'une session
        $session = new Session();
        // Récupération des données de la session de l'utilisateur connecté
        $user = $session->get('user');
        // Récupération de l'index (id) de l'utilisateur
        $userId = $user['id'];

        // Lien avec la BDD
        $model = new OrderModel();
        // A. Lien avec la fonction pour l'ajout d'une command
        // On passe l'id de l'utilisateur pour qu'il puisse se baser sur qqch
        $orderId = $model->addOrder($userId);

        // B. Lien avec la fonction pour l'ajout des détails de la commande
        // On lui passe l'id de l'utilisateur également
        foreach ($formFields['cart'] as $orderLine)
        {
            $quantityChosen = $orderLine['quantityChosen'];
            $productId = $orderLine['id'];
            $model->addOrderDetails($quantityChosen, $productId, $orderId);
        }

        // Renvoi en JSON
        $http->sendJsonResponse([
            'success' => true,
            'orderId' => $orderId
        ]);
    }


}