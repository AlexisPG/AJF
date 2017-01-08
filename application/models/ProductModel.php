<?php

/**
 * Created by PhpStorm.
 * User: wap61
 * Date: 23/11/16
 * Time: 16:04
 */
class ProductModel
{
    /**
     * 
     * Permet de trouver tous les produits
     */
    public function findAll()
    {
        $db = new Database();
        $products = $db->query("SELECT * 
                                FROM Products 
                                ORDER BY category 
                                DESC
                                ");

        return $products;   // Dans une BDD, pas besoin de faire un tableau,
                            // car c'est déjà un tableau
    }
    /**
     *
     * Permet de trouver 1 produit
     */
    public function findOne($id)
    {
        $db = new Database();
        return $db->queryOne("SELECT * 
                                   FROM Products 
                                   WHERE id = ?", [$id]
                                   );
    }

    /**
     * TODO : Update les produits en base 
     */
}