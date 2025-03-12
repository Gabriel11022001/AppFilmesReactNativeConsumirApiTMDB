import axios from "axios"

// consultar os filmes
export const consultarFilmesService = async () => {
    const resp = await axios.get("https://api.themoviedb.org/3/discover/movie", {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2ZhMjE3ZGIyYzVjZmJlZGVhMTQ1ZGYxZDA5OTcyNSIsIm5iZiI6MTczMjM4MTYxOC40MDksInN1YiI6IjY3NDIwYmIyYWMyN2Y1MTZkOWYzNTE2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I7y8ALFa8kmaeN0E4yfMNedfKF_NPwh507RpyrFMAxA"
        },
        params: {
            lenguage: "pt-BR"
        }
    });
    
    return resp;
}

// consultar o filme pelo id no servidor
export const consultarFilmePeloIdService = async (idFilme) => {
    
    return axios.get("https://api.themoviedb.org/3/movie/" + idFilme + "?language=pt-BR", {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2ZhMjE3ZGIyYzVjZmJlZGVhMTQ1ZGYxZDA5OTcyNSIsIm5iZiI6MTczMjM4MTYxOC40MDksInN1YiI6IjY3NDIwYmIyYWMyN2Y1MTZkOWYzNTE2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I7y8ALFa8kmaeN0E4yfMNedfKF_NPwh507RpyrFMAxA"
        }
    });
}

// consultar os filmes melhores votados
export const consultarFilmesMelhoresVotadosService = async () => {

    return await axios.get("https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1", {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2ZhMjE3ZGIyYzVjZmJlZGVhMTQ1ZGYxZDA5OTcyNSIsIm5iZiI6MTczMjM4MTYxOC40MDksInN1YiI6IjY3NDIwYmIyYWMyN2Y1MTZkOWYzNTE2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I7y8ALFa8kmaeN0E4yfMNedfKF_NPwh507RpyrFMAxA"
        }
    });
}