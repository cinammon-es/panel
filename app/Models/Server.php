<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Server extends Model
{
    use HasFactory;

    protected $table = 'servers';

    protected $fillable = [
        'uuid',
        'uuidShort',
        'node', // es un string en la DB
        'name',
        'active',
        'owner',
        'memory',
        'swap',
        'disk',
        'io',
        'cpu',
        'egg_id',
        'oom_disabled',
        'ip',
        'port',
        'service',
        'option',
        'startup',
        'daemonSecret',
        'username',
        'installed',
    ];

    public function egg()
    {
        return $this->belongsTo(Egg::class);
    }
}
