import React from "react";

const List = (props) => {
  const { genre, textProp, valueProps, onSelect, selectedGenre } = props;
  return (
    <ul className="list-group m-2">
      {genre.map((genre) => (
        <li
          className={
            genre === selectedGenre
              ? "list-group-item active"
              : "list-group-item"
          }
          key={genre[valueProps]}
          onClick={() => onSelect(genre)}
        >
          {genre[textProp]}
        </li>
      ))}
    </ul>
  );
};

List.defaultProps = {
  textProp: "name",
  valueProps: "id",
};
export default List;
