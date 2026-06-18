<?php
namespace App\Enums;

enum UserRole: string
{
    case Client = 'client';
    case Provider = 'provider';
    case Admin = 'admin';
    case SuperAdmin = 'super_admin';
}
