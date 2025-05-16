<?php

namespace Database\Seeders;

use App\Models\Egg;
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

/*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Execute the seeder to process egg directories.
     *
     * This method retrieves all directories under the 'seeders/eggs' path and
     * processes each directory by extracting its name. It then delegates the
     * processing of the egg files within each directory to the parseEggFiles
     * method.
     *
     * @return void
     */

/*******  e9eb07ac-d23d-4ca8-8b18-ebcd61803161  *******/    public function run(): void
    {
        $path = database_path('seeders/eggs');
        $directories = array_filter(glob("$path/*"), 'is_dir');

        foreach ($directories as $dir) {
            $category = basename($dir);
            $this->parseEggFiles($category);
        }
    }

    protected function parseEggFiles(string $category): void
    {
        $folder = Str::kebab($category);
        $path = database_path("seeders/eggs/{$folder}");

        if (!is_dir($path)) {
            $this->command->warn("No se encontró la carpeta: {$folder}");
            return;
        }

        $this->command->line("\033[1;36m〄──────────────────────────────────────────────\033[0m");
        $this->command->line("\033[1;35m⌁ C I N A M M O N . N E T ┊ Egg Deployment\033[0m");
        $this->command->line("\033[1;32m⌁ Categoría detectada: {$category}\033[0m");
        $this->command->line("\033[1;33m⌁ Nodo de actualización activo\033[0m");
        $this->command->line("\033[1;36m〄──────────────────────────────────────────────\033[0m");


        foreach (new \DirectoryIterator($path) as $file) {
            if (!$file->isFile() || !$file->isReadable() || $file->getExtension() !== 'json') {
                continue;
            }

            try {
                $decoded = json_decode(file_get_contents($file->getRealPath()), true, 512, JSON_THROW_ON_ERROR);
            } catch (\Exception) {
                $this->command->error("❌ Error al leer: " . $file->getFilename());
                continue;
            }

            $uploadedFile = new UploadedFile(
                $file->getPathname(),
                $file->getFilename(),
                'application/json',
                null,
                true
            );

            $egg = Egg::query()
                ->where('author', $decoded['author'])
                ->where('name', $decoded['name'])
                ->first();

            if ($egg) {
                $this->importerService->fromFile($uploadedFile, $egg);
                $this->command->info("✔ Actualizado: " . $decoded['name']);
            } else {
                $this->importerService->fromFile($uploadedFile);
                $this->command->comment("✔ Creado: " . $decoded['name']);
            }
        }

        $this->command->line('');
    }
}
