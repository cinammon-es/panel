<?php

namespace App\Http\Controllers;

use App\Models\Node;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NodeController extends Controller
{
    public function index(Request $request)
    {
        $query = Node::query();

        // Búsqueda
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Ordenamiento
        $sortable = ['name', 'address', 'ssl', 'public', 'servers_count'];
        $sort = in_array($request->get('sort'), $sortable) ? $request->get('sort') : 'name';
        $direction = $request->get('direction') === 'desc' ? 'desc' : 'asc';
        $query->orderBy($sort, $direction);

        // Paginación dinámica
        $perPage = $request->integer('per_page', 25);
        $paginated = $query->paginate($perPage)->withQueryString();

        // Formateo para el frontend
        $nodes = $paginated->getCollection()->map(function ($node) {
            return [
                'id' => $node->id,
                'name' => $node->name,
                'address' => $node->address,
                'ssl' => $node->scheme === 'https',
                'public' => (bool) $node->public,
                'servers' => $node->servers_count ?? 0,
                'health' => $node->maintenance_mode ? '⚠️' : '✅',
            ];
        });

        $paginated->setCollection($nodes);

        return Inertia::render('Nodes', [
            'nodes' => $paginated,
            'filters' => $request->only(['search', 'sort', 'direction', 'per_page']),
        ]);
    }

    public function show($id)
    {
        $node = Node::findOrFail($id);

        return Inertia::render('NodeShow', [
            'node' => $node,
        ]);
    }
}
