## Cubicles API Documentation

This document details the API endpoints available in the Cubicles job portal application. All endpoints are prefixed with the base URL: `http://localhost:3000/api/v1`.

**For Swagger API documentation & visualization:**

Run backend server then open this in the browser:
```
http://localhost:3000/api-docs/
```

---

## API Endpoint Constants

Defined in `Constant.js`:

```javascript
export const USER_API_END_POINT = "http://localhost:3000/api/v1/user";
export const JOB_API_END_POINT = "http://localhost:3000/api/v1/job";
export const APPLICATION_API_END_POINT = "http://localhost:3000/api/v1/application";
export const COMPANY_API_END_POINT = "http://localhost:3000/api/v1/company";
```


## User Endpoints

### Register User
- **Endpoint:** `POST /user/register`
- **Description:** Registers a new user.
- **Authentication:** Not required.
- **Payload:** Multipart form data (if file upload is involved) or JSON.
- **Example:**
  ```bash
  curl -X POST http://localhost:3000/api/v1/user/register \
    -F "name=John Doe" \
    -F "email=johndoe@example.com" \
    -F "password=secret"
  ```

### Login User
- **Endpoint:** `POST /user/login`
- **Description:** Authenticates a user and returns a JWT.
- **Payload:** JSON
  ```json
  {
    "email": "johndoe@example.com",
    "password": "secret"
  }
  ```
- **Example:**
  ```bash
  curl -X POST http://localhost:3000/api/v1/user/login \
    -H "Content-Type: application/json" \
    -d '{"email": "johndoe@example.com", "password": "secret"}'
  ```

### Logout User
- **Endpoint:** `GET /user/logout`
- **Description:** Logs out the authenticated user.
- **Authentication:** Required.

### Update User Profile
- **Endpoint:** `POST /user/profile/update`
- **Description:** Updates the profile of the authenticated user.
- **Authentication:** Required.
- **Payload:** Multipart form data.

### Generate User Report
- **Endpoint:** `GET /user/report`
- **Description:** Generates a PDF report for the authenticated user.
- **Authentication:** Required.

### Get Recruiter Information
- **Endpoint:** `GET /user/getAllRecruiters`
- **Description:** Retrieves all recruiters.
- **Authentication:** Not required.

- **Endpoint:** `GET /user/getRecruiterCount`
- **Description:** Retrieves the total count of recruiters.
- **Authentication:** Not required.

### Test Error Route
- **Endpoint:** `GET /user/error`
- **Description:** A test route that always returns an error. Used to test error handling.
- **Authentication:** Not required.

## Company Endpoints

### Register a Company
- **Endpoint:** `POST /company/register`
- **Description:** Registers a new company.
- **Authentication:** Required.
- **Payload:** JSON/multipart form data.

### Get Companies for Authenticated User
- **Endpoint:** `GET /company/get`
- **Description:** Retrieves companies associated with the authenticated user.
- **Authentication:** Required.

### Get Company by ID
- **Endpoint:** `GET /company/get/:id`
- **Description:** Retrieves details of a specific company by its ID.
- **Authentication:** Required.

### Update Company
- **Endpoint:** `PUT /company/update/:id`
- **Description:** Updates company details.
- **Authentication:** Required.
- **Payload:** Multipart form data.

### Get All Companies
- **Endpoint:** `GET /company/companies/all`
- **Description:** Retrieves all companies.
- **Authentication:** Not required.

### Company Count
- **Endpoint:** `GET /company/companyCount`
- **Description:** Retrieves the total count of companies.
- **Authentication:** Not required.

### Delete Company
- **Endpoint:** `DELETE /company/delete/:id`
- **Description:** Deletes a company by its ID.
- **Authentication:** Required.

## Job Endpoints

### Post a New Job
- **Endpoint:** `POST /job/post`
- **Description:** Creates a new job listing.
- **Authentication:** Required.
- **Payload:** JSON with job details.

### Get All Jobs (for Students)
- **Endpoint:** `GET /job/get`
- **Description:** Retrieves all job listings.
- **Authentication:** Not required.

### Get Admin Jobs
- **Endpoint:** `GET /job/getadminjobs`
- **Description:** Retrieves jobs created by the admin.
- **Authentication:** Required.

### Get Job by ID
- **Endpoint:** `GET /job/get/:id`
- **Description:** Retrieves details of a specific job by its ID.
- **Authentication:** Not required.

### Job Count
- **Endpoint:** `GET /job/count`
- **Description:** Retrieves the total number of jobs.
- **Authentication:** Not required.

### Update a Job
- **Endpoint:** `PUT /job/update/:id`
- **Description:** Updates an existing job.
- **Authentication:** Required.
- **Payload:** JSON with updated job details.

## Application Endpoints

### Apply for a Job
- **Endpoint:** `POST /application/apply/:id`
- **Description:** Allows the authenticated user to apply for a job with the given ID.
- **Authentication:** Required.
- **Payload:** Application details (if any).

### Get Applied Jobs
- **Endpoint:** `GET /application/get`
- **Description:** Retrieves a list of jobs the authenticated user has applied for.
- **Authentication:** Required.

### Get Applicants for a Job
- **Endpoint:** `GET /application/:id/applicants`
- **Description:** Retrieves applicants for a specific job.
- **Authentication:** Required.

### Get All Applicants
- **Endpoint:** `GET /application/applicants`
- **Description:** Retrieves all applicants across all jobs.
- **Authentication:** Required.

### Update Application Status
- **Endpoint:** `PATCH /application/status/:id/update`
- **Description:** Updates the status of an application.
- **Authentication:** Required.
- **Payload:** JSON with updated status.

### Withdraw Application
- **Endpoint:** `DELETE /application/withdraw/:id`
- **Description:** Allows the applicant to withdraw or delete their application.
- **Authentication:** Required.

### Delete Application (Recruiter)
- **Endpoint:** `DELETE /application/delete/:id`
- **Description:** Allows a recruiter to delete an application.
- **Authentication:** Required.

### Update Application Status (Recruiter)
- **Endpoint:** `PATCH /application/status/:id`
- **Description:** Allows a recruiter to accept or reject an application.
- **Authentication:** Required.
- **Payload:** JSON with the new status.

### Count Applicants
- **Endpoint:** `GET /application/countApplicants`
- **Description:** Retrieves the total number of applicants for all jobs.
- **Authentication:** Not required.

### Get Applicant Counts of Each Company
- **Endpoint:** `GET /application/getApplicantCountsOfEachCompany`
- **Description:** Retrieves applicant counts grouped by company.
- **Authentication:** Not required.

## Blog Endpoints

### Create a Blog Post
- **Endpoint:** `POST /blog/createPost`
- **Description:** Creates a new blog post.
- **Authentication:** Required.
- **Payload:** Blog post details (with file upload if applicable).

### Get All Blog Posts
- **Endpoint:** `GET /blog/getPosts`
- **Description:** Retrieves all blog posts.
- **Authentication:** Not required.

### Get Blog by ID
- **Endpoint:** `GET /blog/:id`
- **Description:** Retrieves a specific blog post by its ID.
- **Authentication:** Not required.

### Get Blogs by Author ID
- **Endpoint:** `GET /blog/author/:id`
- **Description:** Retrieves all blog posts by a specific author.
- **Authentication:** Not required.

### Delete a Blog Post
- **Endpoint:** `DELETE /blog/author/delete/:id`
- **Description:** Deletes a blog post (accessible to the author).
- **Authentication:** Required.

## Comment Endpoints

### Add a Comment to a Blog Post
- **Endpoint:** `POST /blog/:blogId/comments`
- **Description:** Adds a comment to a specific blog post.
- **Authentication:** Required.
- **Payload:** JSON with the comment content.

### Get Comments for a Blog Post
- **Endpoint:** `GET /blog/:blogId/comments`
- **Description:** Retrieves all comments for a specific blog post.
- **Authentication:** Not required.

## Public & Protected Routes (Frontend)

### Public Routes
These routes are accessible without authentication:

- Home Page: `/`
- Login Page: `/login`
- Signup Page: `/signup`
- Jobs List: `/jobs`
- Job Description: `/description/:id`
- Browse Jobs: `/browse`
- User Profile: `/profile`

### Protected Routes (Require Authentication)
#### Admin Routes:
- Manage Companies: `/admin/companies`
- Create a New Company: `/admin/companies/create`
- Setup Company: `/admin/companies/:id`
- View All Jobs as Admin: `/admin/jobs`
- Create a New Job: `/admin/jobs/create`
- View Job Applicants: `/admin/jobs/:id/applicants`

#### Super Admin Routes:
- Super Admin Home: `/supreme`
- List of Applicants: `/supreme/applicants`
- List of Recruiters: `/supreme/recruiters`
- List of Companies: `/supreme/Companies`
- List of Job Vacancies: `/supreme/JobVacancies`

