# Backend – My Responsibilities (Summary)

## 1. Jobs Page – Backend Filtering

- **Controller:** `App\Http\Controllers\JobController`
- **Model:** `App\Models\Job` (assumes `jobs` table exists – teammate’s migration)
- **Routes:**
  - `GET /api/jobs` – list jobs with optional filters
  - `GET /api/jobs/{id}` – single job (for details page)

**Query params for `GET /api/jobs`:**
- `search` – matches **title** OR **description** (partial)
- `category` – exact; send `"All Categories"` or omit to skip
- `city` – exact; send `"All Cities"` or omit to skip

**Example:** `GET /api/jobs?search=web&category=Digital%20%26%20Freelance&city=Oran`

**Expected `jobs` table columns:** `id`, `title`, `description`, `category`, `city`, `employer_id`, `created_at`, `updated_at`

---

## 2. Apply to Job

- **Controller:** `App\Http\Controllers\ApplicationController::store`
- **Migration:** `2025_01_31_000001_create_applications_table.php`
- **Model:** `App\Models\Application`
- **Route:** `POST /api/applications`

**Request body:** `student_id`, `job_id`, `fullname`, `email` (required); `phone`, `message`, `status` (optional).

**Response:** 201 + application object. Duplicate (same student + job) returns 422.

**Note:** Notifications are teammate’s responsibility. The `status` field is in the table for them (e.g. pending, accepted, rejected, completed).

---

## 3. Student Dashboard – My Applications

- **Index:** `GET /api/students/{id}/applications` – `StudentController::getApplications`
- **Update:** `PUT /api/applications/{id}` – `ApplicationController::update`
- **Delete:** `DELETE /api/applications/{id}` – `ApplicationController::destroy`

**Ownership:** Update/destroy require the application to belong to the student:
- **Update:** body must include `student_id` (same as application’s `student_id`).
- **Delete:** query param `student_id` (e.g. `DELETE /api/applications/5?student_id=3`) or body `student_id`.

---

## 4. Contact Us

- **Migration:** `2025_01_31_000002_create_contact_messages_table.php`
- **Model:** `App\Models\ContactMessage`
- **Controller:** `App\Http\Controllers\ContactController::store`
- **Route:** `POST /api/contact`

**Request body:** `name`, `email`, `subject`, `message` (all required).

**Validation:** name/email/subject/message; max lengths enforced.

---

## Migrations

1. Ensure the **jobs** table exists (teammate’s migration) before using applications.
2. Run: `php artisan migrate` for `applications` and `contact_messages`.
