import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./Table";
import "../App.css";

class MovieTable extends Component {
  columns = [
    {
      key: "title",
      path: "title",
      label: "Name",
      content: (movie) => (
        <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none" }}>
          {movie.title}
        </Link>
      ),
    },
    { key: "year", path: "year", label: "Year" },
    { key: "genre", path: "genre.name", label: "Genre" },
    { key: "rating", path: "rating", label: "rating" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          className="btn  btn-sm"
          onClick={() => this.props.onDelete(movie)}
        >
          <i
            style={{ fontSize: "20px", cursor: "pointer" }}
            className="fa-solid fa-trash-can text-danger"
          ></i>
        </button>
      ),
    },
  ];
  render() {
    const { movies, sortColumn, onSort } = this.props;

    return (
      <Table
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
        Columns={this.columns}
      />
    );
  }
}

export default MovieTable;
