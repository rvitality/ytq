import React from "react";
import YouTube from "react-youtube";
import { usePlayerContext } from "../../store/PlayerProvider";

import { IoIosMusicalNotes } from "react-icons/io";
import { IoIosMusicalNote } from "react-icons/io";
import { AiFillYoutube } from "react-icons/ai";

import classes from "./MainPlayer.module.css";

const MainPlayer = () => {
    const playerContext = usePlayerContext();
    const currentVideoId = playerContext.current?.id;

    const opts = {
        height: "100%",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const endHandler = e => {
        // remove played vid
        playerContext.removeVideo(currentVideoId);

        // next vid
        playerContext.playNext();
    };

    const errorHandler = e => {
        console.log("ERROR!!");
    };

    return (
        <div className={classes["player-container"]}>
            {!currentVideoId && (
                <>
                    <h2 className={classes["play-video-heading"]}>
                        <span>{playerContext.ids.length > 0 ? "Play a video" : "Add videos"}</span>
                        {playerContext.ids.length > 0 ? "Play a video" : "Add videos"}
                    </h2>
                    <IoIosMusicalNotes className={classes["icon"]} />
                    <AiFillYoutube className={classes["icon"]} />
                    <IoIosMusicalNote className={classes["icon"]} />
                </>
            )}
            {currentVideoId && (
                <YouTube
                    className={classes["player-container__main"]}
                    onError={errorHandler}
                    videoId={currentVideoId}
                    opts={opts}
                    onEnd={endHandler}
                />
            )}

            {/* <div className={classes["player-container__bottom-fade"]}></div> */}
        </div>
    );
};

export default MainPlayer;
