<?php

/**
 * Created by PhpStorm.
 * User: wap61
 * Date: 28/11/16
 * Time: 12:14
 */
class SessionFilter implements InterceptingFilter
{

    public function run(Http $http, array $queryFields, array $formFields)
    {
        return [
            'session' => new UserSession()
        ];
    }
}