# Senate – Collaborative Game Design for Creators

**Senate** is a full-stack web application that enables users to collaboratively build and manage custom projects and narrative content for tabletop games. It features CRUD functionality, pagination, search, and rich text editing, all within a Dockerized deployment.

---

## Tech Stack

### Frontend
- **Angular** (with routing, reactive forms, modular architecture)
- **TinyMCE** rich text editor
- **SCSS/CSS** for styling
- **Pagination**, **sorting**, and **search** UI/UX
- **Dockerized** for containerized deployment

### Backend
- **Node.js** with **Express.js**
- **MongoDB** via **Mongoose**
- **RESTful API** with modular routing and controller logic
- **Async error handling** and centralized error utility (`AppError`)
- **Pagination**, **search filtering**, and **factory-based CRUD handlers**
- **Dockerized** backend container
- **CORS** configured for local development

---

## Features

### Project Management
- Create, read, update, and delete (CRUD) project entries
- Each project includes a **title**, **description**, and **rich content**
- Section-based UI enriched with dynamic DOM enhancements

### Rich Text Editing
- Uses **TinyMCE** for structured formatting, ideal for longform game design content

### Search & Filtering
- Supports both **exact** and **fuzzy partial match** search via RegEx
- Paginated results with total pages and page jumping logic
- Client-side sorting by **title** or **creation date**

### Modular Architecture
- Clear component and service separation in Angular
- Backend uses factory handlers for reusable controller logic

---

## Notable Code Features

### Angular Enrichment
- `ProjectDetailComponent` enriches inner HTML content to wrap sections dynamically based on headings (e.g., `h2`, `h3`) and injects edit buttons on hover
- `ProjectListComponent` handles advanced pagination UI logic and uses Angular `@Input()` binding for reusable child components

### Backend Search Logic
- Combines exact match and RegEx partial match logic for `title` and `description`
- Custom sort ordering prioritizes closest matches using aggregation

### Middleware + Utilities
- Custom async wrapper (`catchAsync`)
- Factory-style handlers (`createOne`, `deleteOne`, `getOne`)
- Reusable pagination logic via `APIFeatures`

---

## Deployment

Both frontend and backend are containerized via **Docker**.

### To Run Locally

```bash
# Clone the repo and navigate into it
git clone https://github.com/yourname/senate-app.git
cd senate-app

# Start the full stack app (frontend + backend + database)
docker-compose up --build
```

Frontend: http://localhost:4200  
Backend API: http://localhost:8080  
MongoDB: accessible via docker network on port 27017 (internal)
