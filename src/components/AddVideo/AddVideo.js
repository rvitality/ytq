import React, { useRef, useState } from "react";
import { getDuration } from "../../helper/getDuration";
import { getVideoId } from "../../helper/getVideoId";
import { usePlayerContext } from "../../store/PlayerProvider";

import classes from "./AddVideo.module.css";
import { RiPlayListAddLine } from "react-icons/ri";

const AddVideo = () => {
    const playerContext = usePlayerContext();
    const inputRef = useRef();
    const [error, setError] = useState("");

    const submitHandler = e => {
        e.preventDefault();

        const videoId = getVideoId(inputRef.current.value);

        setError("");

        fetch(
            `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&id=${videoId}&key=${process.env.REACT_APP_YT_API_KEY}`
        )
            .then(resp => resp.json())
            .then(data => {
                const items = data.items[0];
                if (items) {
                    const id = items.id;
                    const title = items.snippet.title;
                    const duration = getDuration(items.contentDetails.duration);
                    const thumbnail =
                        items.snippet.thumbnails.standard?.url ||
                        items.snippet.thumbnails.high?.url;

                    playerContext.addVideo({ id, title, duration, thumbnail });
                } else {
                    setError("Invalid URL");
                }
            })
            .catch(err => {
                console.log(err);
            });

        inputRef.current.value = "";
    };

    if (error) {
        setTimeout(() => {
            setError("");
        }, 1500);
    }

    return (
        <>
            <form onSubmit={submitHandler} className={classes["form-module"]}>
                <RiPlayListAddLine className={classes["search-icon"]} />
                <input
                    type="text"
                    placeholder="Add a YouTube URL"
                    className={classes["input-field"]}
                    ref={inputRef}
                />
                <p className={classes["error"]}>{error}</p>
            </form>
        </>
    );
};

export default AddVideo;
