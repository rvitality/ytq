import React from "react";
import { SplideSlide } from "@splidejs/react-splide";
import { usePlayerContext } from "../../store/PlayerProvider";

import { TiDelete } from "react-icons/ti";

import classes from "./PlaylistItem.module.css";

const PlaylistItem = ({ item, onRemove }) => {
    const playerContext = usePlayerContext();

    // const thumbnailSrc = `https://img.youtube.com/vi/${item.id}/maxresdefault.jpg`;

    return (
        <SplideSlide className={classes["playlist__item"]}>
            <div
                className={classes["playlist__item-img"]}
                style={{ backgroundImage: `url("${item.thumbnail}")` }}
                onClick={playerContext.setCurrent.bind(null, item)}
            >
                <p className={classes["duration"]}>{item.duration}</p>
            </div>

            <h3 className={classes["title"]}>{item.title}</h3>

            <button className={classes["remove-btn"]} onClick={onRemove}>
                <TiDelete />
            </button>
        </SplideSlide>
    );
};

export default PlaylistItem;
