<?php

namespace App\Http\Controllers;

use App\Models\Egg;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EggController extends Controller
{

    public function index(Request $request)
    {
        $query = Egg::query();

        if ($request->filled('tag')) {
            $query->whereJsonContains('tags', $request->input('tag'));
        }

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->input('search') . '%');
        }

        $eggs = $query->paginate($request->input('per_page', 10))->withQueryString();

        // EXTRAEMOS TODOS LOS TAGS DE TODOS LOS EGGS
        $tags = Egg::pluck('tags') // asumiendo que es un array tipo json en DB
            ->flatten()
            ->filter()
            ->unique()
            ->values();

        return Inertia::render('Eggs', [
            'eggs' => $eggs,
            'filters' => $request->only(['search', 'sort', 'direction', 'per_page', 'tag']),
            'availableTags' => $tags,
        ]);
    }
}
