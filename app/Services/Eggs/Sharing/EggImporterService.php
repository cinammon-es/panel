<?php

namespace App\Services\Eggs\Sharing;
use Illuminate\Support\Str;

use Illuminate\Http\UploadedFile;
use App\Models\Egg;

class EggImporterService
{
    /**
     * Importa o actualiza un Egg desde un archivo JSON.
     */
    public function fromFile(UploadedFile $file, ?Egg $existingEgg = null): void
    {
        $data = json_decode(file_get_contents($file->getRealPath()), true);

        if (!$data || !isset($data['author'], $data['name'])) {
            return; // Evita errores si el JSON está mal formado
        }

        $payload = [
            'uuid' => $data['uuid'] ?? Str::uuid(), // usa el uuid del JSON o genera uno aleatorio si falta
            'author' => $data['author'],
            'name' => $data['name'],
            'description' => $data['description'] ?? '',
            'json' => json_encode($data),
        ];

        if ($existingEgg) {
            $existingEgg->update($payload);
        } else {
            Egg::create($payload);
        }
    }
}