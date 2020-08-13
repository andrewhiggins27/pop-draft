require 'faraday'

class TMDBSeeder
  def self.pixar_seed!
    key = ENV["TMDB_KEY"]
    pixar_pool = Pool.create(name: "Pixar Features and Shorts")
    num = 1
    while num <= 3 do
      url = "https://api.themoviedb.org/3/discover/movie?api_key=#{key}&language=en-US&with_companies=3&sort_by=popularity.desc&include_adult=false&include_video=false&page=#{num}"

      pixar_conn = Faraday.get(url)
      pixar_response = JSON.parse(pixar_conn.body)

      pixar_response["results"].each do |movie|
        if movie["poster_path"]
          name = movie["original_title"]
          image = "https://image.tmdb.org/t/p/w300" + movie["poster_path"] #movie["backdrop_path"]
          description = movie["overview"].split(". ")[0]

          Selection.create(
            name: name, 
            description: description, 
            image: image, 
            pool: pixar_pool
          )
        end
      end
      num = num + 1
    end
  end

  def self.denzel_seed!
    key = ENV["TMDB_KEY"]
    denzel_pool = Pool.create(name: "Denzel Washington Movies")
    
    url = "https://api.themoviedb.org/3/person/5292/movie_credits?api_key=#{key}&language=en-US"
    denzel_conn = Faraday.get(url)
    denzel_response = JSON.parse(denzel_conn.body)

    denzel_response["cast"].each do |movie|
      if movie["poster_path"] && movie["character"]
        name = movie["title"]
        image = "https://image.tmdb.org/t/p/w300" + movie["poster_path"]
        year = movie["release_date"].split("-")[0]
        description = "Denzel played #{movie["character"]}. Released in #{year}"
        
        Selection.create(
          name: name,
          description: description,
          image: image,
          pool: denzel_pool
        )
      end
    end
  end



end