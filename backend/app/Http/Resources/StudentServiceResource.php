<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentServiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'category' => $this->category,
            'city' => $this->city,
            'availability' => $this->availability,
            'rating' => (float) number_format($this->rating, 1),
            'review_count' => $this->review_count,
            'application_count' => $this->application_count,
            'views' => $this->views,
            'is_active' => $this->is_active,
            'formatted_rating' => $this->formatted_rating,
            'created_at' => $this->created_at->toDateString(),
            'updated_at' => $this->updated_at->toDateString(),
            
            // Relationships
            'student' => [
                'id' => $this->student->id,
                'name' => $this->student->name,
                'email' => $this->student->email,
            ],
            
            // Reviews (if loaded)
            'reviews' => $this->when($this->relationLoaded('reviews'), function () {
                return $this->reviews->map(function ($review) {
                    return [
                        'id' => $review->id,
                        'rating' => $review->rating,
                        'comment' => $review->comment,
                        'reviewer_name' => $review->reviewer->name ?? 'Anonymous',
                        'created_at' => $review->created_at->toDateString(),
                    ];
                });
            }),
            
            // Additional computed fields
            'is_featured' => $this->rating >= 4.5 && $this->review_count >= 5,
            'popularity_score' => $this->calculatePopularityScore(),
        ];
    }

    /**
     * Calculate popularity score based on various factors.
     */
    private function calculatePopularityScore(): float
    {
        $ratingScore = $this->rating * 20; // Max 100
        $reviewScore = min($this->review_count * 2, 100); // Max 100
        $viewScore = min($this->views * 0.1, 100); // Max 100
        
        return round(($ratingScore + $reviewScore + $viewScore) / 3, 1);
    }
}
