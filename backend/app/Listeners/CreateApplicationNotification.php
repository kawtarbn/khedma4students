<?php

namespace App\Listeners;

use App\Events\ApplicationSubmitted;
use App\Services\NotificationService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CreateApplicationNotification implements ShouldQueue
{
    use InteractsWithQueue;

    protected NotificationService $notificationService;

    /**
     * Create the event listener.
     */
    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    /**
     * Handle the event.
     */
    public function handle(ApplicationSubmitted $event): void
    {
        $this->notificationService->applicationSubmitted(
            $event->employer,
            $event->application->id,
            $event->student->name,
            $event->application->job->title
        );
    }
}
