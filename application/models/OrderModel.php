<?php

/**
 * Created by PhpStorm.
 * User: wap61
 * Date: 02/12/16
 * Time: 11:42
 */
class OrderModel
{
    /**
     * Création d'une commande en base de données
     *
     * @param $userId Le numéro de l'utilisateur connecté
     * @return int Le numéro de la commande créée
     */
    public function addOrder($userId)
    {
        $db = new Database();
        return $db->executeSql(' 
                          INSERT INTO Orders (customerId, dateOrdered)
                          VALUES (?, NOW())',
                          [
                              $userId
                          ]);
    }

    /**
     * Création d'une ligne de commande
     *
     * @param $quantityChosen La quantité du produit choisie par le client
     * @param $productId L'id du produit choisi
     * @param $orderId L'id de la commande
     * @return int L'id de la ligne de commande créée
     */
    public function addOrderDetails($quantityChosen, $productId, $orderId)
    {
        $db = new Database();
        return $db->executeSql(' 
                          INSERT INTO OrderDetails(quantityOrdered, productId, orderId)
                          VALUES (?,?,?)',
                          [
                              $quantityChosen,
                              $productId,
                              $orderId
                          ]);
    }
}