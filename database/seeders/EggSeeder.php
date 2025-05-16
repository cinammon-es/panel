<?php

namespace Database\Seeders;

use App\Models\Egg;
use Exception;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use App\Services\Eggs\Sharing\EggImporterService;

class EggSeeder extends Seeder
{
    protected EggImporterService $importerService;

    public function __construct(EggImporterService $importerService)
    {
        $this->importerService = $importerService;
    }

    public function run(): void
    {
        $path = database_path('seeders/eggs');
        $directories = array_filter(glob("$path/*"), 'is_dir');

        foreach ($directories as $dir) {
            $name = basename($dir);
            $this->parseEggFiles($name);
        }
    }

    protected function parseEggFiles(string $name): void
    {
        $folder = Str::kebab($name);
        $path = database_path("seeders/eggs/{$folder}");

        if (!is_dir($path)) {
            $this->command->warn("No se encontró la carpeta: {$folder}");
            return;
        }

        $this->command->alert("Actualizando Eggs para: {$name}");

        foreach (new \DirectoryIterator($path) as $file) {
            if (!$file->isFile() || !$file->isReadable() || $file->getExtension() !== 'json') {
                continue;
            }

            try {
                $decoded = json_decode(file_get_contents($file->getRealPath()), true, 512, JSON_THROW_ON_ERROR);
            } catch (Exception) {
                $this->command->error("Error al leer el archivo: " . $file->getFilename());
                continue;
            }

            $uploadedFile = new UploadedFile($file->getPathname(), $file->getFilename(), 'application/json');

            $egg = Egg::query()
                ->where('author', $decoded['author'])
                ->where('name', $decoded['name'])
                ->first();

            if ($egg instanceof Egg) {
                $this->importerService->fromFile($uploadedFile, $egg);
                $this->command->info("Actualizado: " . $decoded['name']);
            } else {
                $this->importerService->fromFile($uploadedFile);
                $this->command->comment("Creado: " . $decoded['name']);
            }
        }

        $this->command->line('');
    }
}
