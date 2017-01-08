<?php

/**
 * Created by PhpStorm.
 * User: wap61
 * Date: 24/11/16
 * Time: 10:51
 */
class RegisterController
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

            //4. On gère les exceptions qui iront dans le CATCH
            //Si un client existe déjà avec l'email indiqué dans le formulaire on récupère un tableau
            $customer = $model->findWithEmail($formFields['email']);
            $errors = $this->validate($formFields);
                if (count($errors) > 0)
                {
                    throw new DomainException("Il y a des erreurs sur le formulaire");
                }

                //Si le tableau est complété, ça veut dire qu'un client existe déjà avec cet email
                if(!empty($customer))
                {
                    $errors['email'] = "L'email existe déjà";
                    //Dans ce cas on lève une Exception
                    //http://php.net/manual/fr/class.domainexception.php
                    throw new DomainException("Le champ email existe déjà");
                }

            //5. Hash du password
            $password =	new	Password();
            $passwordHashed = $password->hash($formFields['password']);
            $formFields['password'] = $passwordHashed;

            //6.Insertion d'un client
            $model->add($formFields);
            
            
            $flashBag	=	new	FlashBag();
            $flashBag->add('Vous avez bien créé votre compte !');

            //7.Redirection HTTP
            $http->redirectTo('/');
        }
        //8. Gestion des erreures
        catch (DomainException $de)
        {
            return [
                'errorMessage' => $de->getMessage(),
                'errors' => $errors
            ];
        }
    }
//9. Gestion des messages d'erreur
    public function validate($fields)
    {
        $errors = [];
        //  Identité et coordonnées
        if (empty($fields{'firstName'}))
        {
            $errors['firstName'] = "Le champ \"prénom\" ne peut être vide";
        }
        if (empty($fields{'lastName'}))
        {
            $errors['lastName'] = "Le champ \"nom\" ne peut être vide";
        }

        if (!checkdate($fields['month'], $fields['day'], $fields['year']))
        {
            $errors['birthdate'] = "Le champ \"date de naissance\" n'est pas valide";
        }

        if (empty($fields{'address'}))
        {
            $errors['address'] = "Le champ \"adresse\" ne peut être vide";
        }
        if (empty($fields{'city'}))
        {
            $errors['city'] = "Le champ \"ville\" ne peut être vide";
        }
        if (empty($fields{'zipCode'}))
        {
            $errors['zipCode'] = "Le champ \"code postal\" ne peut être vide";
        }
        if (empty($fields{'phone'}))
        {
            $errors['phone'] = "Le champ \"téléphone\" ne peut être vide";
        }

        // Informations d'authentification
        if (filter_var($fields['email'], FILTER_VALIDATE_EMAIL) === false)
        {
            $errors['email'] = "Le champ \"email\" doit être un email valide";
        }

        if (strlen($fields['password']) < 8)
        {
            $errors['password'] = "Le champ \"mot de passe\" doit avoir au-moins 8 caractères";
        }

        return $errors;
    }
}