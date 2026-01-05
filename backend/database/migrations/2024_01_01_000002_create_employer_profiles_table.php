<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('employer_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('company_name');
            $table->string('contact_person');
            $table->string('company_type')->nullable();
            $table->string('city');
            $table->string('email');
            $table->string('phone');
            $table->decimal('average_rating', 3, 2)->default(0);
            $table->integer('total_reviews')->default(0);
            $table->integer('successful_hires')->default(0);
            $table->string('logo_initials')->nullable(); // For "TA" type logos
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employer_profiles');
    }
};

