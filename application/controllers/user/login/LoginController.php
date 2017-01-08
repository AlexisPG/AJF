<?php

/**
 * Created by PhpStorm.
 * User: wap61
 * Date: 25/11/16
 * Time: 16:36
 */
class LoginController
{
    public function httpGetMethod(Http $http, array $formFields)
    {

    }

    /**
     * @param Http $http
     * @param array $formFields
     * @return array
     */
    public function httpPostMethod(Http $http, array $formFields)
    {
        

        // 1. Initialisation d'un tableau d'erreurs vide
        $errors = [];

        // 2. On fait un try / catch pour gérér le code VS les message d'erreur
        try
        {
            // 3. Récupération des informations sur les clients
            $model = new CustomerModel();

            // A. EMAIL
            $customer= $model->findWithEmail($formFields['email']);

            if (empty($customer))
            {

                // A. Gestion messages d'erreurs
                // On gère les exceptions qui iront dans le CATCH
                // Si un client existe déjà avec l'email indiqué dans le formulaire on récupère un tableau

                throw new DomainException("Identifiants incorrects");
            }

            else
            {
                // B. Check password

                $password = new Password();
                $passwordOk = $password->check($formFields['password'], $customer['password']);
            }


            if ($passwordOk)
            {

                //6. Message de validation de connection
                $flashBag = new FlashBag();
                $flashBag->add('Vous êtes bien connecté à votre compte !');

                // Stock en sessions des info utilisateur

                $user = [
                    'id' => $customer['id'],
                    'email' => $customer['email'],
                    'firstName' => $customer['firstName'],
                    'lastName' => $customer['lastName'],
                    'address' => $customer['address'],
                    'phone' => $customer['phone']
                ];
                
                // On créé un nouvelle session + on récupère les info clients
                $session = new Session();
                $session->set('user', $user);
                
                //7.Redirection HTTP
                $http->redirectTo('/');
            }

            else
            {
                throw new DomainException("Identifiants incorrects password");
            }


        } //8. Gestion des erreurs
        catch (DomainException $de)
        {
            return [
                'errorMessage' => $de->getMessage(),
                'errors' => $errors
            ];
        }
    }


}