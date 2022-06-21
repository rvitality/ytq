import React from "react";

const PlayerContext = React.createContext({
    ids: [],
    current: "",
    addVideo: id => {},
    setCurrent: id => {},
    removeVideo: id => {},
});

export default PlayerContext;
