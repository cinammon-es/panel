<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    public const ROOT_ADMIN = 'root_admin';

    protected $fillable = ['name'];
}
