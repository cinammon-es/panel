<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('eggs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->text('startup')->nullable();
            $table->foreignId('config_from')->nullable()->constrained('eggs')->nullOnDelete();

            $table->json('config_stop')->nullable();
            $table->json('config_logs')->nullable();
            $table->json('config_startup')->nullable();
            $table->json('config_files')->nullable();

            $table->longText('script_install')->nullable();
            $table->boolean('script_is_privileged')->default(false);
            $table->text('script_entry')->nullable();
            $table->text('script_container')->nullable();
            $table->foreignId('copy_script_from')->nullable()->constrained('eggs')->nullOnDelete();

            $table->uuid('uuid')->unique();
            $table->string('author')->nullable();
            $table->json('features')->nullable();
            $table->json('docker_images')->nullable();
            $table->string('update_url')->nullable();
            $table->json('file_denylist')->nullable();
            $table->boolean('force_outgoing_ip')->default(false);
            $table->json('tags')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eggs');
    }
};
