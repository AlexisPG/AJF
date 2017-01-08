<?php

/**
 * Created by PhpStorm.
 * User: wap61
 * Date: 28/11/16
 * Time: 13:39
 */
class LogoutController
{
    public function httpGetMethod(Http $http, array $queryFields)
    {
        $session = new Session();
        $session->destroy();

        //Redirection HTTP
        $http->redirectTo('/');
    }
}