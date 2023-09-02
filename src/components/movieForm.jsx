import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "./common/form";
import { getSingleMovie, saveMovie } from "./services/movies";
import { getGenres } from "./services/genre";

function withParams(Component) {
  return (props) => (
    <Component {...props} params={useParams()} navigate={useNavigate()} />
  );
}

class Movieform extends Form {
  state = {
    data: {
      id: "",
      title: "",
      genreId: "",
      rating: "",
      year: "",
    },
    genre: [],
    errors: {},
  };

  async componentDidMount() {
    const { data: genre } = await getGenres();
    this.setState({ genre });

    const movieId = this.props.params.id;
    if (movieId === "new") return;

    try {
      const { data: movie } = await getSingleMovie(movieId);
      this.setState({ data: this.getMovie(movie) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.props.navigate("/not-found");
      toast("Invalid Movie");
      console.log(error);
    }
  }

  getMovie(movie) {
    return {
      id: movie.id,
      title: movie.title,
      genreId: movie.genre.id,
      rating: movie.rating,
      year: movie.year,
    };
  }

  render() {
    return (
      <div className="container w-50 my-3 border border-light shadow-sm rounded p-3">
        <h1 className="text-center">Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("text", "title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genre)}
          {this.renderInput("number", "rating", "Rating")}
          {this.renderInput("number", "year", "Year")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
  validiateForm = () => {
    const errors = {};
    const { title, year, rating, genreId } = this.state.data;

    if (title.trim === "" || title.length < 4) {
      errors.title = "Title is Required";
    }
    if (genreId.length < 1) {
      errors.genreId = "Select Genre";
    }
    if (rating.trim === "" || rating.length < 1) {
      errors.rating = "Rating is Required";
    }
    if (year.trim === "" || year.length < 4) {
      errors.year = "Year is Required";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  validiateInput = ({ name, value }) => {
    if (name === "title") {
      if (value.trim() === "") return "Please Enter Title";
    }
    if (name === "genreId") {
      if (value.trim() === "") return "Please Select Genre";
    }
    if (name === "rating") {
      if (value.trim() === "") return "Please Enter Rating";
    }
    if (name === "year") {
      if (value.trim() === "") return "Please Enter Year";
    }
  };

  afterSubmit = async () => {
    await saveMovie(this.state.data);

    this.props.navigate("/movies");
  };
}

export default withParams(Movieform);
