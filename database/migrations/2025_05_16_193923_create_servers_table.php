<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('servers', function (Blueprint $table) {
            $table->id(); // PRIMARY KEY BIGINT UNSIGNED
            $table->string('uuid', 36)->unique();
            $table->string('uuidShort', 8)->unique();
            $table->unsignedMediumInteger('node');
            $table->string('name');
            $table->boolean('active');
            $table->unsignedMediumInteger('owner');
            $table->unsignedInteger('memory');
            $table->unsignedInteger('swap');
            $table->unsignedInteger('disk');
            $table->unsignedInteger('io');
            $table->unsignedInteger('cpu');
            $table->boolean('oom_disabled')->default(false);
            $table->string('ip');
            $table->unsignedInteger('port');
            $table->unsignedMediumInteger('service');
            $table->unsignedMediumInteger('option');
            $table->text('startup');
            $table->string('daemonSecret', 36)->unique();
            $table->string('username')->unique();
            $table->boolean('installed')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('servers');
    }
};
