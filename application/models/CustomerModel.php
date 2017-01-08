<?php

/**
 * Created by PhpStorm.
 * User: wap61
 * Date: 24/11/16
 * Time: 14:26
 */
class CustomerModel
{
    public function findAll()
    {
        $db = new Database();
        $customers = $db->query("SELECT * FROM customers");

        return $customers;
    }

    public function findWithEmail($email)
    {
        $db = new Database();
        $result = $db->queryOne("
                            SELECT	*	
                            FROM	Customers 
                            WHERE	email = ?",[$email]
                            );
        return $result;
    }

    public function add($formField)
    {
        $birthdate = $formField['year'] . "-" . $formField['month'] . "-" . $formField['day'];
        $db = new Database();
        $addCustomers = $db->executeSql('
                          INSERT INTO Customers(firstName, lastName, birthdate, address, city, country, zipCode, email, phone, dateCustomerCreation, password, lastConnexion)
                          VALUES (?,?,?,?,?,?,?,?,?,NOW(),?,NULL)
                        ',
            [
                $formField['firstName'],
                $formField['lastName'],
                $birthdate,
                $formField['address'],
                $formField['city'],
                $formField['country'],
                $formField['zipCode'],
                $formField['email'],
                $formField['phone'],
                $formField['password']
            ]);

        return $addCustomers;
    }


}