require 'faraday'

class MortySeeder
  def self.seed!
    morty_pool = Pool.create(name: "Rick and Morty Characters")
    num = 1
    while num <= 29 do
      morty_conn = Faraday.get("https://rickandmortyapi.com/api/character/?page=#{num}")
      morty_conn_response = JSON.parse(morty_conn.body)

      morty_conn_response["results"].each do |character|
        name = character["name"]
        description = "#{character["species"]} #{character["gender"].downcase} from #{character["origin"]["name"]}"
        image = character["image"]
  
        Selection.create(
          name: name, 
          description: description, 
          image: image, 
          pool: morty_pool
      )
      end

      num = num + 1
    end
  end
end