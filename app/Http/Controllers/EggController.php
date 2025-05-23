<?php

namespace App\Http\Controllers;

use App\Models\Egg;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EggController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Egg::query();

        // Filtro por tag (se asume texto separado por comas en la base de datos)
        if ($request->filled('tag')) {
            $query->where('tags', 'like', '%' . $request->input('tag') . '%');
        }

        // Filtro por búsqueda
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->input('search') . '%');
        }

        // Ordenamiento opcional
        if ($request->filled('sort') && $request->filled('direction')) {
            $query->orderBy($request->input('sort'), $request->input('direction'));
        }

        // Obtener los resultados paginados
        $eggs = $query->paginate($request->input('per_page', 10))->withQueryString();

        // Extraer todos los tags únicos desde el campo tipo texto separado por comas
        $tags = Egg::pluck('tags')
            ->filter()
            ->flatMap(function ($item) {
                return explode(',', $item); // ya que vienen como string plano
            })
            ->map(fn($tag) => trim($tag))
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
