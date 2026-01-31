<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->longText('description');
            $table->string('category');
            $table->string('city');
            $table->string('contactEmail');
            $table->string('contactPhone');
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('jobs');
    }
};
