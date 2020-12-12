export const getPoster = (posterId) => {
    switch (posterId) {
        case 'Poster_01.jpg': return require('./Posters/Poster_01.jpg');
        case 'Poster_02.jpg': return require('./Posters/Poster_02.jpg');
        case 'Poster_03.jpg': return require('./Posters/Poster_03.jpg');
        case 'Poster_05.jpg': return require('./Posters/Poster_05.jpg');
        case 'Poster_06.jpg': return require('./Posters/Poster_06.jpg');
        case 'Poster_07.jpg': return require('./Posters/Poster_07.jpg');
        case 'Poster_08.jpg': return require('./Posters/Poster_08.jpg');
        case 'Poster_10.jpg': return require('./Posters/Poster_10.jpg');
        default: return null;
    };
};
