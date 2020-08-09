require 'faraday'

class MiyazakiSeeder
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

  def self.seed!
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
  end
end