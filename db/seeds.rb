require 'faraday'
require 'faraday_middleware'

MIYAZAKI_CHARS = [
  {
    title: "Spirited Away",
    url: "https://api.jikan.moe/v3/anime/199/characters_staff"
  },
  {
    title: "Howl's Moving Castle",
    url: "https://api.jikan.moe/v3/anime/431/characters_staff"
  },
  {
    title: "My Neighbor Totoro",
    url: "https://api.jikan.moe/v3/anime/523/characters_staff"
  },
  {
    title: "Princess Mononoke",
    url: "https://api.jikan.moe/v3/anime/164/characters_staff"
  },
  {
    title: "Kiki's Delivery Service",
    url: "https://api.jikan.moe/v3/anime/512/characters_staff"
  },
  {
    title: "Nausicaä of the Valley of the Wind",
    url: "https://api.jikan.moe/v3/anime/572/characters_staff"
  },
  {
    title: "Ponyo",
    url: "https://api.jikan.moe/v3/anime/2890/characters_staff"
  }
]

Selection.destroy_all
Pool.destroy_all
Game.destroy_all

# First 150 Pokemon
# -------------------------
pokemon_pool = Pool.create(name: "First 150 Pokemon")
num = 1
while num <= 150 do
  pokemon_conn = Faraday.get("https://pokeapi.co/api/v2/pokemon/#{num}")
  pokemon_conn_response = JSON.parse(pokemon_conn.body)

  species_conn = Faraday.get("https://pokeapi.co/api/v2/pokemon-species/#{num}")
  species_conn_response = JSON.parse(species_conn.body)

  pokemon_name = pokemon_conn_response["name"].capitalize()

  pokemon_descriptions = species_conn_response["flavor_text_entries"]
  pokemon_descriptions = pokemon_descriptions.select { |x| x["language"]["name"] == "en" }
  pokemon_description = pokemon_descriptions[0]["flavor_text"]
  pokemon_description = pokemon_description.gsub("\n", " ")
  pokemon_description = pokemon_description.gsub("\f", " ")
  pokemon_image = pokemon_conn_response["sprites"]["front_default"]

  Selection.create(
    name: pokemon_name, 
    description: pokemon_description, 
    image: pokemon_image, 
    pool: pokemon_pool
)

  num = num + 1
end

# Hayao Miyazaki Characters
# --------------------------
miyazaki_pool = Pool.create(name: "Hayao Miyazaki Characters")
MIYAZAKI_CHARS.each do |movie|
  description = movie[:title]

  miyazaki_conn = Faraday.get("#{movie[:url]}")
  miyazaki_conn_response = JSON.parse(miyazaki_conn.body)

  characters_array = miyazaki_conn_response["characters"]
  characters_array.each do |character|
    name = character["name"]
    image = character["image_url"]
    Selection.create(
      name: name,
      description: description,
      image: image,
      pool: miyazaki_pool
    )
  end
end

Selection.where({
   image: "https://cdn.myanimelist.net/images/questionmark_23.gif?s=f7dcbc4a4603d18356d3dfef8abd655c"
}).destroy_all
Selection.where({name: "Makkuro-Kurosuke"}).last.destroy

# SUPERHERO POOL
# -------------------------
superhero_pool = Pool.create(name: "Superheros")

num = 1
while num <= 731 do
  key = ENV["SUPERHERO_KEY"]
  url = "https://www.superheroapi.com/api.php/#{key}/#{num}"

  superhero_conn = Faraday.get("#{url}")
  superhero_object = JSON.parse(superhero_conn.body)

  name = superhero_object["name"]
  biography = superhero_object["biography"]
  first_appearance = biography["first-appearance"]
  publisher = biography["publisher"]
  description = "First Appearance:\n#{first_appearance}\n\nPublisher:\n#{publisher}"
  image = superhero_object["image"]["url"]

  Selection.create(
    name: name,
    description: description,
    image: image,
    pool: superhero_pool
  )
  num = num + 1
end
