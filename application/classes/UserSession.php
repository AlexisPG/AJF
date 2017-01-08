<?php

/**
 * Created by PhpStorm.
 * User: wap61
 * Date: 28/11/16
 * Time: 14:08
 */
class UserSession extends Session
{
    public function get($index)
    {
        $user = parent::get('user');
        return $user[$index];
    }

    public function isAuthenticated()
    {
        return parent::get('user') != null;
    }
}