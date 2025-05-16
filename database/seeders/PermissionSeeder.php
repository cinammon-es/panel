<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $mod = Role::firstOrCreate(['name' => 'moderator']);

        $permissions = ['view_panel', 'manage_users', 'edit_settings'];

        foreach ($permissions as $perm) {
            $p = Permission::firstOrCreate(['name' => $perm]);
            $admin->givePermissionTo($p);
        }

        $mod->givePermissionTo('view_panel');
    }
}