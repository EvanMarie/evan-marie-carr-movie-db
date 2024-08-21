# Take Me to the Movies

<div style="display: flex; justify-content: center; width: 100%;"> <div style="text-align: center;"> <img src="https://mhejreuxaxxodkdlfcoq.supabase.co/storage/v1/render/image/public/darkVioletPublic/various/movie-db/splashscreen.webp" alt="Splash Screen" width="800" /> <p><em>Figure 1:  Take Me To The Movies: Splash Screen</em></p> </div> </div>

## Deployment

You can view the live version of the "Take Me to the Movies" application here:

[Take Me to the Movies - Live Deployment](https://evan-marie-carr-movie-db.fly.dev/)

---

## Table of Contents

1. [Introduction](#introduction)
2. [Key Features](#key-features)
3. [Tech Stack](#tech-stack)
4. [Architecture Overview](#architecture-overview)
5. [Components](#components)
   - [Main Landing Page](#main-landing-page)
   - [Movies Page](#movies-page)
   - [Movie Details Page](#movie-details-page)
   - [API Interaction](#api-interaction)
6. [Benefits of Using Remix](#benefits-of-using-remix)
7. [Error Handling with Remix's ErrorBoundary](#error-handling-with-remixs-errorboundary)
8. [Running the Project](#running-the-project)
9. [API Documentation](#api-documentation)
   - [Fetching Movies](#fetching-movies)
   - [Fetching Movie by ID](#fetching-movie-by-id)
   - [Fetching Genres](#fetching-genres)
10. [Interesting Highlights](#interesting-highlights)
11. [Future Improvements](#future-improvements)
12. [Challenges and Solutions](#challenges-and-solutions)

## Introduction

**Take Me to the Movies** is a fully responsive, feature-rich web application built to demonstrate proficiency in modern web development. This app allows users to search, browse, and explore a collection of movies, with an emphasis on clear functionality and user experience, focusing on the effective use of APIs, state management, and UI/UX design.

<div style="display: flex; justify-content: center; width: 100%;"> <div style="text-align: center;"> <img src="https://mhejreuxaxxodkdlfcoq.supabase.co/storage/v1/render/image/public/darkVioletPublic/various/movie-db/initial-view.webp" alt="Initial View" width="800" /> <p><em>Figure 1:  Take Me To The Movies: Initial View</em></p> </div> </div>

## Key Features

- **Movie Search**: Search for movies by title using the provided Movies API.
- **Genre Filtering**: Filter search results by genre to find movies that match specific interests.
- **Paginated Results**: Navigate through pages of movie results, ensuring smooth access to large datasets.
- **Movie Details**: View detailed information about each movie, including summary, poster, duration, and rating.
- **Responsive Design**: Ensures that the application works seamlessly on various screen sizes, from the smallest mobile screen to the largest HD screens.

## Tech Stack

- **Frontend**:

  - React with Remix for server-side rendering and routing.
  - TypeScript for strong typing and code safety.
  - Tailwind CSS for utility-first styling.
  - Framer Motion for smooth animations.

- **API**:

  - RESTful API with Bearer Token Authorization.

- **Build Tools**:
  - npm for package management.
  - Remix CLI for project scaffolding.
  - <div style="display: flex; justify-content: center; width: 100%;"> <div style="text-align: center;"> <img src="https://mhejreuxaxxodkdlfcoq.supabase.co/storage/v1/render/image/public/darkVioletPublic/various/movie-db/genre-search.webp" alt="Genre Search" width="800" /> <p><em>Figure 1:  Take Me To The Movies: Genre Search</em></p> </div> </div>

## Architecture Overview

The app is structured with a clear separation between components, data fetching, and state management. Remix is used for routing and server-side rendering, ensuring fast load times. The actual app is implemented entirely client-side, using Remix's client loader features. The codebase is modular, with components designed for reuse and easy maintenance. The building block components come from my own boilerplate Remix-Tailwind-Vite template, which makes project setup quick and simple.

## Components

### Main Landing Page

**File**: `index.tsx`

The landing page is designed to immediately engage the user with a clean, visually appealing interface. The page features animated text, image animations, and animated buttons to draw the user into the main functionality of the app.

### Movies Page

**File**: `movies/index.tsx`

This is the core of the application, where users can:

- **Search for Movies**: Users can enter a movie title in the search bar to find specific movies.
- **Filter by Genre**: Users can filter the movie results by selecting a genre from a dropdown menu.
- **Pagination**: Users can navigate through the results using next/previous buttons, with the total number of results displayed.
- **MoviesHeaderBar**: A component that includes the search bar and genre filter.
- **MovieCard**: A component that displays individual movie details in a card format.
- **PaginationControls**: Controls for navigating through paginated movie results.

### Movie Details Page

**File**: `movies/$id.tsx`

When a user selects a movie, they are taken to the details page, which provides:

- **Detailed Movie Information**: Including title, summary, rating, release date, and more.
- **Expandable Poster Image**: Users can view a larger version of the movie poster.
- **List of Associated Data**: Directors, writers, genres, and main actors are all listed clearly.
- **Navigation**: Users can easily return to the previous page or close the details view.

### API Interaction

All API calls are centralized in `utils/movies-api.ts`, ensuring a clean and maintainable codebase. This file handles fetching movies, fetching a movie by ID, and fetching available genres, with proper error handling and authorization.

<div style="display: flex; justify-content: center; width: 100%;"> <div style="text-align: center;"> <img src="https://mhejreuxaxxodkdlfcoq.supabase.co/storage/v1/render/image/public/darkVioletPublic/various/movie-db/genre-view.webp" alt="Genre View" width="800" /> <p><em>Figure 1:  Take Me To The Movies: Genre View</em></p> </div> </div>

## Benefits of Using Remix

Remix is a powerful framework that significantly enhances the development process by offering several key benefits:

1. **Server-Side Rendering (SSR) for Better Performance**  
   Remix natively supports server-side rendering, which ensures that pages load quickly and are SEO-friendly. By rendering pages on the server, Remix delivers content to the user faster, reducing time-to-interactive and improving overall performance.

2. **ClientLoader Functionality for Data Fetching**  
   The `ClientLoader` functionality in Remix is a key advantage for managing data-fetching logic. It allows you to:

   - **Centralize Data Fetching**: All data required for a route is fetched before the component renders. This ensures that the UI only renders when the data is ready, avoiding issues like flickering or loading states.
   - **Seamless Integration with React**: The fetched data is passed directly to the component via `useLoaderData`, simplifying the state management and making the codebase more maintainable.
   - **Automatic Handling of Errors and Redirects**: Remix’s `ClientLoader` can gracefully handle errors or redirects, streamlining the flow of your application and improving user experience.
   - **Hydration**: Remix automatically hydrates the application, allowing for dynamic and interactive components to take over once the page is loaded on the client side.

3. **Nested Routes and Layouts**  
   Remix’s nested routing makes it easy to create complex layouts and UI structures that share components like headers, footers, and sidebars. This is particularly beneficial in an app like "Take Me to the Movies," where different pages share common elements, such as the search bar and genre filter.

4. **Efficient Asset Management**  
   Remix optimizes the loading of assets such as images, styles, and scripts. This means your app delivers only the necessary assets to the client, reducing the load time and bandwidth usage.

5. **Great Developer Experience**  
   Remix’s strong conventions and tight integration with React allow developers to focus more on building features rather than managing infrastructure. Features like hot reloading, easy configuration, and built-in TypeScript support contribute to a faster and more enjoyable development process.

<div style="display: flex; justify-content: center; width: 100%;"> <div style="text-align: center;"> <img src="https://mhejreuxaxxodkdlfcoq.supabase.co/storage/v1/render/image/public/darkVioletPublic/various/movie-db/scroll-progress.webp" alt="Scroll Progress" width="800" /> <p><em>Figure 1:  Take Me To The Movies: Scroll Progress</em></p> </div> </div>

## Error Handling with Remix's ErrorBoundary

In "Take Me to the Movies," robust error handling is achieved through the use of Remix's `ErrorBoundary`. This feature provides a structured way to manage unexpected errors in the application, ensuring that users are presented with a meaningful and user-friendly error message rather than a blank screen or generic browser error page.

<div style="display: flex; justify-content: center; width: 100%;"> <div style="text-align: center;"> <img src="https://mhejreuxaxxodkdlfcoq.supabase.co/storage/v1/render/image/public/darkVioletPublic/various/movie-db/no-movies-found.webp" alt="No Movies Found" width="800" /> <p><em>Figure 1:  Take Me To The Movies: No Movies Found</em></p> </div> </div>

### Example Implementation

The `ErrorBoundary` component is designed to handle different types of errors, including route errors and generic JavaScript errors. Here’s a brief overview of how it's implemented:

```javascript
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    // Handle route errors with a custom UI
    return (
      <div>
        {/* Custom UI for route errors */}
        <h1>Oh, snippity snaps!</h1>
        <p>
          {error.status} - {error.statusText}
        </p>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    // Handle generic JavaScript errors
    return (
      <div>
        {/* Custom UI for JavaScript errors */}
        <h1>Oh, snippity snaps!</h1>
        <p>{error.message}</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
```

In this implementation:

- **Route errors** (such as 404s or 500s) are handled separately, providing specific messages based on the error type.
- **JavaScript errors** are caught and displayed with stack traces, helping both the developer and user understand what went wrong.
- A fallback for unknown errors ensures that no errors go unnoticed.

<div style="display: flex; justify-content: center; width: 100%;"> <div style="text-align: center;"> <img src="https://mhejreuxaxxodkdlfcoq.supabase.co/storage/v1/render/image/public/darkVioletPublic/various/movie-db/movies-id.webp" alt="Single Movie View" width="800" /> <p><em>Figure 1:  Take Me To The Movies: Single Movie View</em></p> </div> </div>

## Running the Project

To run the project locally:

1. **Clone the repository**:
   ```bash
   git clone <
   ```

repository-url>

````

2. **Install dependencies**:
```bash
npm install
````

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`.

<div style="display: flex; justify-content: center; width: 100%;"> <div style="text-align: center;"> <img src="https://mhejreuxaxxodkdlfcoq.supabase.co/storage/v1/render/image/public/darkVioletPublic/various/movie-db/expanded-movie-image.webp" alt="Expanded Movie Image" width="800" /> <p><em>Figure 1:  Take Me To The Movies: Expanded Movie Image</em></p> </div> </div>

## API Documentation

### Fetching Movies

**Endpoint**: `/movies`

**Parameters**:

- `page`: The page number to fetch (default: 1).
- `limit`: Number of movies per page (default: 36).
- `genre`: Filter movies by genre (optional).
- `search`: Search for a movie by title (optional).

### Fetching Movie by ID

**Endpoint**: `/movies/{id}`

**Parameters**:

- `id`: The ID of the movie to fetch.

### Fetching Genres

**Endpoint**: `/genres/movies`

## Interesting Highlights

- **Animated Landing Page**: The landing page uses Framer Motion for smooth animations, providing a lively user experience right from the start.
- **Dynamic Search and Filtering**: The combination of search and genre filtering allows users to quickly narrow down results, enhancing usability.
- **Expandable Movie Posters**: On the movie details page, users can interact with the poster to view a larger version, adding a tactile element to the UI.
- **Optimized Data Fetching**: The use of Remix's `ClientLoader` ensures that data is fetched efficiently, reducing unnecessary re-renders and improving performance.

## Future Improvements

Given more time, the following features could further enhance the application:

- **User Authentication and Favorites**: Allow users to sign in and save their favorite movies for easy access.
- **Advanced Filtering Options**: Include filters for ratings, release dates, search by actors or directors, and more to help users find exactly what they’re looking for.
- **Enhanced Mobile Experience**: Although responsive, additional mobile-specific enhancements could make the app more touch-friendly.

## Challenges and Solutions

### Pagination State Management

**Challenge**: Managing the current page state across the application while keeping the URL in sync.

**Solution**: Utilized Remix's `useSearchParams` to manage URL parameters for the current page, genre, and search query, ensuring that the application state is reflected in the URL.

### API Integration

**Challenge**: Handling API interactions efficiently, including managing authorization tokens and error handling.

**Solution**: Centralized API calls in a dedicated utility file, ensuring that all components interact with the API in a consistent and secure manner.
