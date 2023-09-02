import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Getmovies, deleteMovie } from "./services/movies";
import { getGenres } from "./services/genre";
import { Paginate } from "./common/paginatedata";
import { HashLoader } from "react-spinners";
import Pagination from "./common/pagination";
import List from "./common/list_group";
import MovieTable from "./Movie_table";
import _ from "lodash";

class Movies extends Component {
  state = {
    movie_data: [],
    movie_genre: [],
    pageSize: 5,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    loading: true,
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genre = [{ id: "", name: "All" }, ...data];
    const { data: movies } = await Getmovies();
    this.setState({ movie_data: movies, movie_genre: genre, loading: false });
  }

  Pagedata = () => {
    const { pageSize, currentPage, movie_data, selectedGenre, sortColumn } =
      this.state;

    const FilteredMovies =
      selectedGenre && selectedGenre.id
        ? movie_data.filter((m) => m.genre.id === selectedGenre.id)
        : movie_data;

    const sorted = _.orderBy(
      FilteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies = Paginate(sorted, currentPage, pageSize);

    return { totalCount: FilteredMovies.length, data: movies };
  };
  render() {
    const {
      pageSize,
      currentPage,
      movie_genre,
      selectedGenre,
      sortColumn,
      loading,
    } = this.state;
    const { totalCount, data: movies } = this.Pagedata();
    // if (totalCount === 0) {
    //   return (
    //     <h2 className="text-center text-muted">There are no Movies Left</h2>
    //   );
    // }

    return (
      <div className="row mt-5">
        <div className="col-md-3">
          <List
            genre={movie_genre}
            onSelect={this.handleSelect}
            selectedGenre={selectedGenre}
          />
        </div>

        <div className="col-md-9">
          <p>Showing {totalCount} Movies </p>
          <Link className="btn btn-primary" to="/movies/new">
            New
          </Link>
          <HashLoader color="#000000" loading={loading} className="m-auto" />
          <MovieTable
            movies={movies}
            onLike={this.like}
            onDelete={this.Delete_data}
            onSort={this.Sort}
            sortColumn={sortColumn}
          />
          <Pagination
            totalItem={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.PageChange}
          />
        </div>
      </div>
    );
  }

  handleSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  PageChange = (page) => {
    this.setState({ currentPage: page });
  };

  Delete_data = async (movie) => {
    const original = this.state.movie_data;

    const Updated = original.filter((m) => m !== movie);
    this.setState({ movie_data: Updated });
    try {
      await deleteMovie(movie.id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("This Movie Has been Already Deletd");
      }
      this.setState({ movie_data: original });
    }
  };

  like = (movie) => {
    const movies = [...this.state.movie_data];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movie_data: movies });
  };

  Sort = (sortColumn) => {
    this.setState({ sortColumn });
  };
}

export default Movies;
