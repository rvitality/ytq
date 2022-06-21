import React, { useRef, useEffect } from "react";
import MainPlayer from "./components/MainPlayer/MainPlayer";
import { usePlayerContext } from "./store/PlayerProvider";
import Playlist from "./components/Playlist/Playlist";

import classes from "./App.module.css";
import AddVideo from "./components/AddVideo/AddVideo";
import Random from "./components/Random/Random";

import { database } from "./firebase-config";
import { getDatabase, ref, onValue } from "firebase/database";
const db = getDatabase();
const videosRef = ref(db, "videos/");

const App = () => {
    const playerContext = usePlayerContext();
    const initialRender = useRef(true);

    useEffect(() => {
        fetch("https://video-queuing-default-rtdb.asia-southeast1.firebasedatabase.app/videos.json")
            .then(resp => resp.json())
            .then(data => {
                // console.log(data || []);
                playerContext.setInitials(data || []);
            })
            .catch(err => console.log(err));

        //  listen for events whenever the realtimeDB changes
        onValue(videosRef, snapshot => {
            const data = snapshot.val();

            if (Object.keys(playerContext.current)?.length === 0) {
                playerContext.setCurrent(data?.[0] || {});
            }

            if (playerContext.ids?.length === 0) {
                playerContext.setInitials(data || []);
            }
        });
    }, []);

    useEffect(() => {
        // update videos
        if (!initialRender.current) {
            fetch(
                "https://video-queuing-default-rtdb.asia-southeast1.firebasedatabase.app/videos.json",
                {
                    method: "PUT",
                    body: JSON.stringify(playerContext.ids),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
                .then(resp => resp.json())
                .then(data => {
                    // console.log(data);
                })
                .catch(err => console.log(err));
        } else {
            initialRender.current = false;
        }
    }, [playerContext.ids]);

    return (
        <>
            <div className={classes["app"]}>
                <div className={classes["header"]}>
                    <h1 className={classes["logo-heading"]}>
                        <a href="#">ytq.</a>
                    </h1>
                    <AddVideo />
                    <Random />
                </div>

                <MainPlayer />
                <div className={classes["bottom-fade"]}></div>
            </div>

            {playerContext.ids?.length >= 0 && <Playlist />}
        </>
    );
};

export default App;
