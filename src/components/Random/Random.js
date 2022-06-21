import React, { useState } from "react";

import { getDuration } from "../../helper/getDuration";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { usePlayerContext } from "../../store/PlayerProvider";

import classes from "./Random.module.css";

const Random = () => {
    const [category, setCategory] = useState(10);
    const playerContext = usePlayerContext();

    const generateRandomHandler = () => {
        fetch(
            `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&chart=mostPopular&maxResults=5&regionCode=US&videoCategoryId=${category}&key=${process.env.REACT_APP_YT_API_KEY}`
        )
            .then(resp => resp.json())
            .then(data => {
                // console.log(data);
                const items = data.items;

                if (items) {
                    const modifiedData = items.map(item => {
                        const id = item.id;
                        const title = item.snippet.title;
                        const duration = getDuration(item.contentDetails.duration);
                        const thumbnail =
                            item.snippet.thumbnails.standard?.url ||
                            item.snippet.thumbnails.high?.url ||
                            item.snippet.thumbnails.maxres?.url;

                        return {
                            id,
                            title,
                            duration,
                            thumbnail,
                        };
                    });

                    playerContext.setInitials(modifiedData || []);

                    if (!playerContext.current) {
                        playerContext.setCurrent(modifiedData?.[0]);
                    }
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className={classes["random-selection"]}>
            <select
                className={classes["select-category"]}
                // value={category}
                defaultValue="10"
                onChange={e => setCategory(e.target.value)}
            >
                <option value="2">Autos & Vehicles</option>
                <option value="1">Film & Animation</option>
                <option value="10">Music</option>
                <option value="15">Pets & Animals</option>
                <option value="17">Sports</option>
                <option value="18">Short Movies</option>
                <option value="19">Travel & Events</option>
                <option value="20">Gaming</option>
                <option value="21">Videoblogging</option>
                <option value="22">People & Blogs</option>
                <option value="23">Comedy</option>
                <option value="24">Entertainment</option>
                <option value="25">News & Politics</option>
                <option value="26">Howto & Style</option>
                <option value="27">Education</option>
                <option value="28">Science & Technology</option>
                <option value="29">Nonprofits & Activism</option>
                <option value="30">Movies</option>
                <option value="31">Anime/Animation</option>
                <option value="32">Action/Adventure</option>
                <option value="33">Classics</option>
                <option value="34">Comedy</option>
                <option value="35">Documentary</option>
                <option value="36">Drama</option>
                <option value="37">Family</option>
                <option value="38">Foreign</option>
                <option value="39">Horror</option>
                <option value="40">Sci-Fi/Fantasy</option>
                <option value="41">Thriller</option>
                <option value="42">Shorts</option>
                <option value="43">Shows</option>
                <option value="44">Trailers</option>
            </select>

            <button className={classes["random-btn"]} onClick={generateRandomHandler}>
                <GiPerspectiveDiceSixFacesRandom className={classes["svg"]} />
            </button>
        </div>
    );
};

export default Random;
