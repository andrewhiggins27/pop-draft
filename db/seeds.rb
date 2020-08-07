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
  },
  {
    title: "Porco Rosso",
    url: "https://api.jikan.moe/v3/anime/416/characters_staff"
  }
]

Selection.destroy_all
Pool.destroy_all
Game.destroy_all

pokemon_pool = Pool.create(name: "First 150 Pokemon")

num = 1
while num <= 150 do
  pokemon_conn = Faraday.new(url: "https://pokeapi.co/api/v2/pokemon/#{num}") do |faraday|
    faraday.adapter Faraday.default_adapter
    faraday.response :json
  end
  species_conn = Faraday.new(url: "https://pokeapi.co/api/v2/pokemon-species/#{num}") do |faraday|
    faraday.adapter Faraday.default_adapter
    faraday.response :json
  end

  pokemon_name = pokemon_conn.get.body["name"].capitalize()

  pokemon_description = species_conn.get.body["flavor_text_entries"][0]["flavor_text"]
  pokemon_description = pokemon_description.gsub("\n", " ")
  pokemon_description = pokemon_description.gsub("\f", " ")
  pokemon_image = pokemon_conn.get.body["sprites"]["front_default"]

  Selection.create(
    name: pokemon_name, 
    description: pokemon_description, 
    image: pokemon_image, 
    pool: pokemon_pool
)

  num = num + 1
end

miyazaki_pool = Pool.create(name: "Hayao Miyazaki Characters")
MIYAZAKI_CHARS.each do |movie|
  description = movie[:title]

  miyazaki_conn = Faraday.new(url: "#{movie[:url]}") do |faraday|
    faraday.adapter Faraday.default_adapter
    faraday.response :json
  end

  characters_array = miyazaki_conn.get.body["characters"]
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






# Myazaki characters
# Spirited Away
# https://api.jikan.moe/v3/anime/199/characters_staff

# Howl's Moving Castle
# https://api.jikan.moe/v3/anime/431/characters_staff

# My Neighbor Totoro
# https://api.jikan.moe/v3/anime/523/characters_staff

# Princess Mononoke
# https://api.jikan.moe/v3/anime/164/characters_staff

# Kiki's Delivery Service
# https://api.jikan.moe/v3/anime/512/characters_staff

# Nausicaä of the Valley of the Wind	
# https://api.jikan.moe/v3/anime/572/characters_staff

# Ponyo
# https://api.jikan.moe/v3/anime/2890/characters_staff

# Castle in the Sky
# https://api.jikan.moe/v3/anime/513/characters_staff

# Porco Rosso
# https://api.jikan.moe/v3/anime/416/characters_staff