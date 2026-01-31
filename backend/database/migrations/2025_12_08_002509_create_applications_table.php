<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Applications table: links students to jobs (Apply to Job).
     * Notifications are handled by teammate (status field can be used by them).
     * Runs after students table (filename order).
     */
    public function up(): void
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
            // job_id references jobs table (created by teammate); no FK constraint so migration runs even if jobs migration is elsewhere
            $table->unsignedBigInteger('job_id');
            $table->string('fullname');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->text('message')->nullable();
            // status: for teammate (notifications); e.g. pending, accepted, rejected, completed
            $table->string('status')->default('pending');
            $table->timestamps();

            // One application per student per job
            $table->unique(['student_id', 'job_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
