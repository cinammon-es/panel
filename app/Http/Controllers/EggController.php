<?php

namespace App\Http\Controllers;

use App\Models\Egg;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EggController extends Controller
{
    public function index(Request $request)
    {
        $query = Egg::query();

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $eggs = $query->orderBy('name')->paginate(15)->withQueryString();

        return Inertia::render('Eggs', [
            'eggs' => $eggs,
            'filters' => $request->only('search'),
        ]);
    }

    public function show($id)
    {
        $egg = Egg::findOrFail($id);

        return Inertia::render('EggShow', [
            'egg' => $egg,
        ]);
    }
}
