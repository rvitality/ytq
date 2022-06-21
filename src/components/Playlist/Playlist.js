import React from "react";
import PlaylistItem from "./PlaylistItem";

import { usePlayerContext } from "../../store/PlayerProvider";

import { Splide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import classes from "./Playlist.module.css";

const Playlist = () => {
    const playerContext = usePlayerContext();

    const removeVideoHandler = id => {
        playerContext.removeVideo(id);

        // check if the removed video is currently being played
        if (id === playerContext.current.id) {
            playerContext.playNext();
        }
    };

    return (
        <div className={classes["playlist"]}>
            {playerContext.ids.length > 0 && (
                <>
                    <h2 className={classes["watch-next-heading"]}>
                        <span>Watch more</span>
                        <span>Watch more</span>
                    </h2>
                    <Splide
                        className={classes["playlist__splide"]}
                        options={{
                            rewind: true,
                            gap: "3rem",
                            perPage: 3,
                            pagination: false,
                            arrows: false,
                            breakpoints: {
                                768: {
                                    perPage: 2,
                                },
                                320: {
                                    perPage: 1,
                                },
                            },
                        }}
                    >
                        {playerContext.ids.map(item => (
                            <PlaylistItem
                                key={item.id}
                                item={item}
                                onRemove={removeVideoHandler.bind(null, item.id)}
                            />
                        ))}
                    </Splide>
                </>
            )}
        </div>
    );
};

export default Playlist;
