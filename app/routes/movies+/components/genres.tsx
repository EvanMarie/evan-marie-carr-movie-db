import { fetchGenres } from "~/utils/movies-api";

export default function Genres() {
  const genres = fetchGenres();
  return (
    <div>
      <h1>Genres</h1>
    </div>
  );
}
