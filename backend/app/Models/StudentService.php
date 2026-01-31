<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class StudentService extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'student_id',
        'title',
        'description',
        'category',
        'city',
        'availability',
        'rating',
        'review_count',
        'application_count',
        'views',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'rating' => 'decimal:2',
        'review_count' => 'integer',
        'application_count' => 'integer',
        'views' => 'integer',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the student that owns the service.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    /**
     * Get the reviews for the service.
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, 'service_id');
    }

    /**
     * Get all of the service's notifications.
     */
    public function notifications(): MorphMany
    {
        return $this->morphMany(Notification::class, 'related');
    }

    /**
     * Scope a query to only include active services.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to filter by category.
     */
    public function scopeOfCategory($query, string $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Scope a query to filter by city.
     */
    public function scopeInCity($query, string $city)
    {
        return $query->where('city', $city);
    }

    /**
     * Scope a query to search by title or description.
     */
    public function scopeSearch($query, string $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%");
        });
    }

    /**
     * Scope a query to order by rating.
     */
    public function scopeOrderByRating($query, string $direction = 'desc')
    {
        return $query->orderBy('rating', $direction);
    }

    /**
     * Scope a query to order by review count.
     */
    public function scopeOrderByReviews($query, string $direction = 'desc')
    {
        return $query->orderBy('review_count', $direction);
    }

    /**
     * Get the formatted rating with review count.
     */
    public function getFormattedRatingAttribute(): string
    {
        return sprintf('%.1f (%d)', $this->rating, $this->review_count);
    }

    /**
     * Increment the view count.
     */
    public function incrementViews(): int
    {
        return $this->increment('views');
    }

    /**
     * Increment the application count.
     */
    public function incrementApplications(): int
    {
        return $this->increment('application_count');
    }

    /**
     * Update the service rating based on reviews.
     */
    public function updateRating(): void
    {
        $this->rating = $this->reviews()->avg('rating') ?? 0;
        $this->review_count = $this->reviews()->count();
        $this->save();
    }

    /**
     * Get available categories.
     */
    public static function getAvailableCategories(): array
    {
        return [
            'Freelance & Digital Work',
            'Tutoring & Education',
            'Service & Delivery',
            'Health & Wellness',
            'Home & Family Help',
            'Events & Temporary Work',
        ];
    }

    /**
     * Get available cities.
     */
    public static function getAvailableCities(): array
    {
        return [
            'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa',
            'Biskra', 'Béchar', 'Blida', 'Bouira', 'Tamanrasset', 'Tébessa',
            'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger', 'Djelfa', 'Jijel',
            'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma',
            'Constantine', 'Médéa', 'Mostaganem', 'MSila', 'Mascara', 'Ouargla',
            'Oran', 'El Bayadh', 'Illizi', 'Bordj Bou Arreridj', 'Boumerdès',
            'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued', 'Khenchela',
            'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent',
            'Ghardaïa', 'Relizane', 'Timimoun', 'Bordj Badji Mokhtar',
            'Ouled Djellal', 'Béni Abbès', 'In Salah', 'In Guezzam',
            'Touggourt', 'Djanet', 'El MGhair', 'El Meniaa',
        ];
    }
}
