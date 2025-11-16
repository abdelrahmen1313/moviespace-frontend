export const films = [
    
        {
          "id" : 1,
          "title": "The Shawshank Redemption",
          "description": "Wrongly convicted, Andy Dufresne finds hope and friendship in prison, ultimately escaping to freedom.",
          "posterURL": "https://cdn.cinematerial.com/p/297x/b5v2e9jg/the-shawshank-redemption-movie-poster-md.jpg?v=1596989012",
          "rating": 9.3,
          "trailerURL": "https://www.youtube.com/embed/PLl99DlL6b4"
        },
        {   "id": 2,
          "title": "Inception",
          "description": "A skilled thief enters dreams to steal secrets but is haunted by his past and a dangerous mission.",
          "posterURL": "https://cdn.cinematerial.com/p/136x/7uwb4va7/inception-movie-poster-sm.jpg?v=1456797089",
          "rating": 8.8,
          "trailerURL": "https://www.youtube.com/embed/YoHD9XEInc0"
       
        },
        {
          "id" : 3,
          "title": "Parasite",
          "description": "A poor family infiltrates a wealthy household, leading to unexpected consequences in this dark social satire.",
          "posterURL": "https://cdn.cinematerial.com/p/136x/xrk7wvgp/parasite-for-your-consideration-movie-poster-sm.jpg?v=1580571598",
          "rating": 8.5,
          "trailerURL": "https://www.youtube.com/embed/5xH0HfJHsaY"
        },

        {
          "id" : 4,
          "title": "La La Land",
          "description": "An aspiring actress and a jazz musician fall in love while pursuing their dreams in Los Angeles.",
          "posterURL": "https://cdn.cinematerial.com/p/297x/unoktgtv/la-la-land-movie-poster-md.jpg?v=1472589717",
          "rating": 8.0,
          "trailerURL": "https://www.youtube.com/embed/0pdqf4P9MB8"
        },
     
        {
          "id" : 5,
          "title": "The Dark Knight",
          "description": "Batman faces his greatest psychological and physical challenge when the Joker wreaks havoc on Gotham.",
          "posterURL": "https://cdn.cinematerial.com/p/136x/iy6vlrde/the-dark-knight-movie-poster-sm.jpg?v=1456281503",
          "rating": 9.0,
          "trailerURL": "https://www.youtube.com/embed/EXeTwQWrcwY"
        },
        {
          "id" : 6,
          "title": "Titanic (1997)",
          "description": "A young couple from different social classes fall in love aboard the ill-fated RMS Titanic.",
          "posterURL": "https://cdn.cinematerial.com/p/297x/zv8lstqd/titanic-movie-poster-md.jpg?v=1704644889",
          "rating": 7.9,
          "trailerURL": "https://www.youtube.com/embed/CHekzSiZjrY"
        },
        {
          "id" : 7,
          "title": "Interstellar",
          "description": "A team of explorers travel through a wormhole in space to ensure humanity's survival.",
          "posterURL": "https://cdn.cinematerial.com/p/297x/ctpnz4mq/interstellar-movie-poster-md.jpg?v=1456424450",
          "rating": 8.6,
          "trailerURL": "https://www.youtube.com/embed/zSWdZVtXT7E"
        },
        {
          "id" : 8,
          "title": "The Grand Budapest Hotel",
          "description": "A legendary concierge and his protégé become involved in a murder mystery and art theft.",
          "posterURL": "https://cdn.cinematerial.com/p/297x/ojtilc50/the-grand-budapest-hotel-movie-poster-md.jpg?v=1456051558",
          "rating": 8.1,
          "trailerURL" : "https://www.youtube.com/embed/mXRztrOK47I"
        },
     
        { 
          "id" : 9,
          "title": "La Vie en Rose",
          "description": "The tragic and triumphant life of French singer Édith Piaf, portrayed with emotional depth.",
          "posterURL": "https://cdn.cinematerial.com/p/297x/ydzanprz/la-vie-en-rose-french-movie-poster-md.jpg?v=1500667955",
          "rating": 7.6,
          "trailerURL" : "https://www.youtube.com/embed/TORCpMSbWjU"
        }
      
]

export const TopRatedMovies = films.sort((a, b ) => b.rating - a.rating).slice(0,5);

