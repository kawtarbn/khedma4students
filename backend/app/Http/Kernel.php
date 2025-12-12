<?php
namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * @var array
     */
    protected $middleware = [
        // Other middleware...
        \App\Http\Middleware\Cors::class,
    ];

    // ... other properties like $middlewareGroups, $routeMiddleware
}
