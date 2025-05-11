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

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $nodes = $query->orderBy('name')->paginate(15)->withQueryString();

        return Inertia::render('Nodes', [
            'nodes' => $nodes,
            'filters' => $request->only('search'),
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
