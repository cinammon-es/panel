<?php

namespace App\Http\Controllers;

use App\Models\Server;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServerController extends Controller
{
    public function index(Request $request)
    {
        $query = Server::with('egg');

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Soporte para orden dinámico
        $sort = $request->input('sort', 'name');
        $direction = $request->input('direction', 'asc');
        $query->orderBy($sort, $direction);

        $paginated = $query->paginate(15)->withQueryString();

        $servers = $paginated->getCollection()->map(function ($server) {
            return [
                'id' => $server->id,
                'uuid' => $server->uuid,
                'name' => $server->name,
                'description' => '-',
                'status' => $server->installed ? 'online' : 'offline',
                'node' => $server->node ?? 'Unknown',
                'egg' => optional($server->egg)->name ?? 'Unknown',
                'nest' => '-',
                'username' => $server->username ?? 'Unknown',
                'allocation' => $server->ip . ':' . $server->port,
                'database' => 'N/A',
                'servers' => 0,
            ];
        });

        $paginated->setCollection($servers);

        return Inertia::render('Servers', [
            'servers' => $paginated,
            'filters' => $request->only('search', 'sort', 'direction'),
            'availableTags' => [],
        ]);
    }
}
