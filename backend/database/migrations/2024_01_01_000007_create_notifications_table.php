<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('type'); // application, message, rating, job_expiring, etc.
            $table->string('title');
            $table->text('description');
            $table->string('icon')->nullable();
            $table->boolean('is_read')->default(false);
            $table->foreignId('related_id')->nullable(); // ID of related job, application, etc.
            $table->string('related_type')->nullable(); // job, application, etc.
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};

