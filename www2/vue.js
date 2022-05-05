let vm = new Vue({
    el: '#vue-app',
    data: {
      message: 'Hello Vue.js',
      todos: [{text: 'auto1'}, {text: 'auto2'}, {text: 'auto3'}, {text: 'auto4'}],
      movie: {},
      displayShows: false,
      functions: [],
    },
    methods: {
        set: function(movie){
            this.movie = movie;
            mui.viewport.showPage('content-page','DEF');
				    return true;
        },
        enableDisplayShows: function(){
          this.displayShows = !this.displayShows;
          this.functions = this.movie.cinemaShows;
          console.log(this.functions);
        },
        showFilms: function(cinema){
          this.cinema = cinema;
          this.getData();
        },
        filter: function(data) {
          selectedCine = document.getElementById("cinemaSelect").value;
          document.getElementById("cinemaSelect").selected == "true";
          const newList = [];
          for (movie of data){
            const cinemas = movie.cinemaShows;
            console.log(movie);
            for (cine of cinemas){
              if(selectedCine != "" && selectedCine === cine.cinema){
                newList.push(movie);
              }
            }
          }
          this.todos = newList;
        },
        async getData() {
          try {
            let response = await fetch('https://api.movie.com.uy/api/shows/rss/data');
            await response.json().then(value => 
              this.filter(value.contentCinemaShows)
            );
            console.log(this.todos[0]);
          } catch (error) {
            console.log(error);
          }
        },
      },
    
    mounted() {
        this.getData();
    },
}
);