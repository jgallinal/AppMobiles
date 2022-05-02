let vm = new Vue({
    el: '#vue-app',
    data: {
      message: 'Hello Vue.js',
      todos: [{text: 'auto1'}, {text: 'auto2'}, {text: 'auto3'}, {text: 'auto4'}],
      movie: {}
    },
    methods: {
        set: function(movie){
            this.movie = movie;
        },
        async getData() {
          try {
            let response = await fetch('https://api.movie.com.uy/api/shows/rss/data');
            await response.json().then(value => this.todos = value.contentCinemaShows);
            console.log(this.todos);
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