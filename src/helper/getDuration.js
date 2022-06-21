const setTwoDigit = input => (input.toString().length === 1 ? `0${input}` : input);

export const getDuration = input => {
    var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
    var hours = 0,
        minutes = 0,
        seconds = 0;
    // totalseconds;

    if (reptms.test(input)) {
        var matches = reptms.exec(input);
        if (matches[1]) hours = Number(matches[1]);
        if (matches[2]) minutes = Number(matches[2]);
        if (matches[3]) seconds = Number(matches[3]);
        // totalseconds = hours * 3600 + minutes * 60 + seconds;
    }

    if (hours) {
        return `${setTwoDigit(hours)}:${setTwoDigit(minutes)}:${setTwoDigit(seconds)}`;
    }

    return `${setTwoDigit(minutes)}:${setTwoDigit(seconds)}`;
};
