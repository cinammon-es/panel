<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use App\Models\User;

class UsersWithRoleSeeder extends Seeder
{
    public function run(): void
    {
        // Crear roles si no existen
        $roles = ['Owner', 'Admin', 'Moderador', 'Helper', 'Sponsers', 'Miembros'];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }

        // Crear usuarios
        $users = [
            [
                'name' => 'Nia Owner',
                'email' => 'owner@cinammon.net',
                'password' => 'owner123',
                'roles' => ['Owner', 'Admin', 'Moderador', 'Helper', 'Sponsers', 'Miembros'],
            ],
            [
                'name' => 'Nia Admin',
                'email' => 'admin@cinammon.net',
                'password' => 'admin123',
                'roles' => ['Admin', 'Moderador', 'Helper'],
            ],
            [
                'name' => 'Nia Mod',
                'email' => 'moderador@cinammon.net',
                'password' => 'mod123',
                'roles' => ['Moderador'],
            ],
        ];

        foreach ($users as $data) {
            $user = User::updateOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'],
                    'password' => Hash::make($data['password']),
                    'email_verified_at' => now(),
                    'timezone' => 'UTC',
                ]
            );

            $user->syncRoles($data['roles']);
        }
    }
}
