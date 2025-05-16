<?php

// app/Models/Server.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Server extends Model
{
    protected $fillable = ['name', 'egg_id']; // ajusta los campos reales
}
