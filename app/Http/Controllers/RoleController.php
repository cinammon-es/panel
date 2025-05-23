<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RoleController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Role::query();

        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%{$search}%");
        }

        if ($request->filled('sort') && $request->filled('direction')) {
            $query->orderBy($request->input('sort'), $request->input('direction'));
        }

        $roles = $query->paginate($request->input('per_page', 10))->withQueryString();

        // Simulación de permisos y users_count para frontend
        $roles->getCollection()->transform(function ($role) {
            return [
                'id' => $role->id,
                'name' => $role->name,
                'permissions' => ['all'], // simulamos permisos (puedes cambiarlo luego)
                'users_count' => 1, // simulamos cantidad de usuarios
            ];
        });

        return Inertia::render('Roles', [
            'roles' => $roles,
            'filters' => $request->only(['search', 'sort', 'direction', 'per_page']),
        ]);
    }
}
