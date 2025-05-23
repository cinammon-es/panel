<?php

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EggController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\NodeController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\ServerController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\RoleController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/settings/appearance', [SettingsController::class, 'appearance'])->name('settings.appearance');
});

Route::post('/settings/font', function (Request $request) {
    $request->validate(['font' => 'required|string']);
    $request->user()->update(['font' => $request->font]);
    return back();
})->middleware('auth');

Route::resource('posts', PostController::class);
Route::resource('tickets', TicketController::class)->except(['create']);
Route::post('/tickets/{ticket}/messages', [TicketController::class, 'storeMessage'])->name('tickets.message.store');
Route::get('/tickets/{id}/edit', [TicketController::class, 'edit'])->name('tickets.edit');
Route::put('/tickets/{id}', [TicketController::class, 'update'])->name('tickets.update');
Route::delete('/tickets/{ticket}/messages/{message}', [TicketController::class, 'destroyMessage'])->name('tickets.messages.destroy');
Route::resource('eggs', EggController::class);
Route::resource('nodes', NodeController::class);
Route::resource('servers', ServerController::class);
Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
