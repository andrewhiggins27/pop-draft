# README
[![Codeship Status for andrewhiggins27/fantasy-fantasy-draft](https://app.codeship.com/projects/b7e2ee50-b7d4-0138-730e-3ac7fbcc44db/status?branch=master)](https://app.codeship.com/projects/404702)


Pop-Draft is an app developed by Andrew Higgins for Launch Academy bootcamp as a capstone project.

Check it out [here](https://pop-draft.herokuapp.com)

"PopDraft is a pop-culture drafting game. Compete with your friends to draft the coolest teams from a variety of pop culture draft pools."

Pop-Draft uses a React front-end and Rails back-end along with the Zurb Foundation CSS Framework.

###Set Up
To run Pop-Draft locally, run the following commands to set up dependencies and the database:

#NOTE You must have PostGres installed and running to create the database

```
yarn install
bundle exec bundle install
bundle exec rake db:create
bundle exec rake db:migrate
bundle exec rake db:seed
```

### Usage
To run locally, open two terminal windows. In one, run:

```
rails s
```

And in the other run:

```
yarn run start
```

Then navigate to http://localhost:3000 in your web browser.

### APIs

Pop-Draft would not be possible without these incredible public APIs:
 - [SuperHero Api](https://superheroapi.com/)
 - [PokeApi](https://pokeapi.co/)
 - [Jikan API](https://jikan.moe/)
 - [Rick and Morty API](https://rickandmortyapi.com/)
 - [TMDB API](https://www.themoviedb.org/documentation/api?language=en-US)


 ### Libraries

 Pop-Draft uses many fantastic Ruby Gems and JavaScript libraries. Some of these libraries include:

  - [devise](https://github.com/heartcombo/devise)
  - [acts_as_votable](https://github.com/ryanto/acts_as_votable)
  - [faraday](https://github.com/lostisland/faraday)
  - [react-hover](https://github.com/cht8687/react-hover#readme)
  - [react-confirm-alert](https://github.com/GA-MO/react-confirm-alert)
  - [react-alert](https://github.com/schiehll/react-alert#readme)


### The Future of Pop-Draft

Pop-Draft is still a work in progress! I plan to add more draft pools and more features. Check back in regularly for updates!