import React, { useContext, useReducer } from "react";
import PlayerContext from "./player-context";

const reducer = (state, action) => {
    const { type, payload } = action;

    if (type === "ADD") {
        let currentCopy = state.current;
        const updatedIds = [...state.ids, payload.item];

        if (!state.current) {
            currentCopy = payload.item;
        }

        return { ...state, current: currentCopy, ids: updatedIds };
    }

    if (type === "SET_CURRENT") {
        return { ...state, current: payload.item };
    }

    if (type === "REMOVE") {
        const copyIds = [...state.ids];
        const updatedIds = copyIds.filter(item => item.id !== payload.id);

        return { ...state, ids: updatedIds };
    }

    if (type === "PLAY_NEXT") {
        const copyIds = [...state.ids];
        const currentIndex = copyIds.findIndex(item => item.id === state.current.id);

        let nextVideo = null;

        // check if it's the last item
        // console.log(currentIndex, copyIds.length);
        if (currentIndex !== copyIds.length - 1) {
            // console.log("last");
            const nextIndex = currentIndex + 1 >= copyIds.length ? 0 : currentIndex + 1;
            nextVideo = copyIds[nextIndex];
        }

        // console.log(nextVideo);

        return { ...state, current: nextVideo };
    }

    if (type === "SET_INITIAL") {
        return { ...state, ids: payload.initialIds };
    }

    return { ids: [], current: "" };
};

const PlayerProvider = props => {
    const [state, dispatch] = useReducer(reducer, { ids: [], current: "" });

    const addVideoHandler = item => {
        // const { id, title, thumbnail } = item;
        dispatch({ type: "ADD", payload: { item } });
    };

    const setCurrentHandler = item => {
        dispatch({ type: "SET_CURRENT", payload: { item } });
    };

    const playNextHandler = () => {
        dispatch({ type: "PLAY_NEXT" });
    };

    const removeVideoHandler = id => {
        dispatch({ type: "REMOVE", payload: { id } });
    };

    const setInitialsHandler = initialIds => {
        dispatch({ type: "SET_INITIAL", payload: { initialIds } });
    };

    const context = {
        ids: state.ids,
        current: state.current,
        addVideo: addVideoHandler,
        setCurrent: setCurrentHandler,
        setInitials: setInitialsHandler,
        playNext: playNextHandler,
        removeVideo: removeVideoHandler,
    };

    return <PlayerContext.Provider value={context}>{props.children}</PlayerContext.Provider>;
};

export default PlayerProvider;

export const usePlayerContext = () => {
    return useContext(PlayerContext);
};
