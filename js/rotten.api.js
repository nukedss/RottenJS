/*
 * 
 */
(function(w){
	w.RottenTomatoes={
		options: {},
		init: function(options){
			options = $.extend({apiKey: ""}, options);
			
			w.RottenTomatoes.options = options;
			
			w.RottenTomatoes.Consts.VAL_APIKEY = options.apiKey;
		},
		onJSONPError: function(resp){
			
		},
		api: function(method){
			var consts = w.RottenTomatoes.Consts,
				createData = w.RottenTomatoes.createData,
				genUrl = w.RottenTomatoes.genUrl,
				priv={
					_get: function(url, d, fn){
						  $.ajax({
						    url: url,
						    data: d,
						    dataType: "jsonp",
						    success: fn,
						    fail: w.RottenTomatoes.onJSONPError
						  });
					},
					search: function(type, values, fn){
						var data = createData(consts.OP_SEARCH, type, values);
						
						priv._get(consts.URL_MOVIE_SEARCH, data, fn);
					},
					info: function(url, fn){
						var data = createData(consts.OP_GET, consts.OP_DATA_APIKEY);
						
						priv._get(url, data, fn);
					},
					lists: function(url, fn){
						priv.info(url, fn);
					},
					limitCountry: function(url, type, limit, country, fn){
						if(typeof limit == "function")
							priv._get(url, createData(consts.OP_GET, type, [ ]), limit);
						else if(typeof country == "function")
							priv._get(url, createData(consts.OP_GET, type, [ limit ]), country);
						else
							priv._get(url, createData(consts.OP_GET, type, [ limit, country ]), fn);
					},
					pagedCountry: function(url, type, page_limit, page, country, fn){
						if(typeof page_limit == "function")
							priv._get(url, createData(consts.OP_GET, type, [ ]), page_limit);
						else if(typeof page == "function")
							priv._get(url, createData(consts.OP_GET, type, [ page_limit ]), page);
						else if(typeof country == "function")
							priv._get(url, createData(consts.OP_GET, type, [ page_limit, page ]), country);
						else
							priv._get(url, createData(consts.OP_GET, type, [ page_limit, page, country ]), fn);
					}
				},
				pub={
					options: function(id, values){
						var options = w.RottenTomatoes.options;
						
						if( typeof id === 'object' ) 
							w.RottenTomatoes.options = id;
						else if(!id)
							return w.RottenTomatoes.options;
						else if(options[id] && values)
							w.RottenTomatoes.options[id] = value;
						else if(options[id])
							return w.RottenTomatoes.options[id];
						else
							return undefined;
					},
					movieSearch: function(q, page_limit, page, fn){
						if(typeof page_limit == "function")
							priv.search(consts.OP_MOVIE_SEARCH, [ q ], page_limit);
						else if(typeof page == "function")
							priv.search(consts.OP_MOVIE_SEARCH, [ q, page_limit ], page);
						else
							priv.search(consts.OP_MOVIE_SEARCH, [ q, page_limit, page ], fn);
					},
					listsDirectory: function(fn){
						priv.lists(consts.URL_LISTS, fn);
					},
					movieLists: function(fn){
						priv.lists(consts.URL_MOVIE_LISTS, fn);
					},
					dvdLists: function(fn){
						priv.lists(consts.URL_DVD_LIST, fn);
					},
					boxOfficeMovies: function(fn){
						priv.lists(consts.URL_BOXOFFICE_LIST, fn);
					},
					inTheatersMovies: function(page_limit, page, country, fn){
						priv.pagedCountry(consts.URL_INTHEATER_LIST, consts.OP_GET_INTHEATERS, page_limit, page, country, fn);
					},
					openingMovies: function(limit, country, fn){
						priv.limitCountry(consts.URL_OPENINGMOVIES_LIST, consts.OP_GET_OPENING, limit, country, fn);
					},
					upcomingMovies: function(page_limit, page, country, fn){
						priv.pagedCountry(consts.URL_UPCOMINGMOVIE_LIST, consts.OP_GET_UPCOMING, page_limit, page, country, fn);
					},
					topDvdRentals: function(limit, country, fn){
						priv.limitCountry(consts.URL_TOPRENTALS_LIST, consts.OP_GET_TOPRENTALS, limit, country, fn);
					},
					currentReleaseDvds: function(page_limit, page, country, fn){
						priv.pagedCountry(consts.URL_CURRENTRELEASEDVDS_LIST, consts.OP_GET_CURRENTDVDRELEASES, page_limit, page, country, fn);
					},
					newReleaseDvds: function(page_limit, page, country, fn){
						priv.pagedCountry(consts.URL_NEWRELEASEDVDS_LIST, consts.OP_GET_NEWDVDRELEASES, page_limit, page, country, fn);
					},
					upcomingDvds: function(page_limit, page, country, fn){
						priv.pagedCountry(consts.URL_UPCOMINGDVDS_LIST, consts.OP_GET_UPCOMINGDVDS, page_limit, page, country, fn);
					},
					movie: function(movieID, fn){
						priv.info(genUrl(consts.URLTEMP_MOVIE_INFO, {id: movieID}), fn);
					},
					movieCast: function(movieID, fn){
						priv.info(genUrl(consts.URLTEMP_MOVIE_CAST, {id: movieID}), fn);
					},
					movieClips: function(movieID, fn){
						priv.info(genUrl(consts.URLTEMP_MOVIE_CLIPS, {id: movieID}), fn);
					},
					reviews: function(movieID, review_type, page_limit, page, country, fn){
						if(typeof review_type == "function")
							priv._get(genUrl(consts.URLTEMP_MOVIE_REVIEWS, {id: movieID}), createData(consts.OP_GET, consts.OP_GET_MOVIEREVIEWS, [ ]), review_type);
						else if(typeof page_limit == "function")
							priv._get(genUrl(consts.URLTEMP_MOVIE_REVIEWS, {id: movieID}), createData(consts.OP_GET, consts.OP_GET_MOVIEREVIEWS, [ review_type ]), page_limit);
						else if(typeof page == "function")
							priv._get(genUrl(consts.URLTEMP_MOVIE_REVIEWS, {id: movieID}), createData(consts.OP_GET, consts.OP_GET_MOVIEREVIEWS, [ review_type, page_limit ]), page);
						else if(typeof country == "function")
							priv._get(genUrl(consts.URLTEMP_MOVIE_REVIEWS, {id: movieID}), createData(consts.OP_GET, consts.OP_GET_MOVIEREVIEWS, [ review_type, page_limit, page ]), country);
						else
							priv._get(genUrl(consts.URLTEMP_MOVIE_REVIEWS, {id: movieID}), createData(consts.OP_GET, consts.OP_GET_MOVIEREVIEWS, [ review_type, page_limit, page, country ]), fn);
					},
					similarMovies: function(movieID, limit, fn){
						if(typeof review_type == "function")
							priv._get(genUrl(consts.URLTEMP_MOVIE_SIMILAR, {id: movieID}), createData(consts.OP_GET, consts.OP_GET_MOVIESIMILAR, [ ]), review_type);
						else if(typeof page_limit == "function")
							priv._get(genUrl(consts.URLTEMP_MOVIE_SIMILAR, {id: movieID}), createData(consts.OP_GET, consts.OP_GET_MOVIESIMILAR, [ review_type ]), page_limit);
						else if(typeof page == "function")
							priv._get(genUrl(consts.URLTEMP_MOVIE_SIMILAR, {id: movieID}), createData(consts.OP_GET, consts.OP_GET_MOVIESIMILAR, [ review_type, page_limit ]), page);
						else if(typeof country == "function")
							priv._get(genUrl(consts.URLTEMP_MOVIE_SIMILAR, {id: movieID}), createData(consts.OP_GET, consts.OP_GET_MOVIESIMILAR, [ review_type, page_limit, page ]), country);
						else
							priv._get(genUrl(consts.URLTEMP_MOVIE_SIMILAR, {id: movieID}), createData(consts.OP_GET, consts.OP_GET_MOVIESIMILAR, [ review_type, page_limit, page, country ]), fn);
					}
				},
				ui={
						
				};
			
			if ( pub[method] ) {
				  return pub[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
			} else if ( ui[method] ) {
				  return ui[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
			} else if ( w.RottenTomatoes[method] ) {
			  return w.RottenTomatoes[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
			} else if ( typeof method === 'object' || ! method ) {
			  return w.RottenTomatoes.init.apply( this, arguments );
			} else {
			  $.error( 'Method ' +  method + ' does not exist on RottenTomatoes' );
			}  
		}
	};
})(window);

(function(w){
	w.RottenTomatoes.createData=function(o, p, v){
		//shortcut to the consts data.
		var consts = w.RottenTomatoes.Consts;
		
		var methods={
				search: function(p,v){
					switch(p){
						case consts.OP_MOVIE_SEARCH:
							if(v == null){
								return {
									apikey: consts.VAL_APIKEY
								};
							}else if(v.length == 1){
								return {
									apikey: consts.VAL_APIKEY,
									q: v[0]
								};
							}else if(v.length == 2){
								return {
									apikey: consts.VAL_APIKEY,
									q: v[0],
									page_limit: v[1]
								};
							}else{
								return {
									apikey: consts.VAL_APIKEY,
									q: v[0],
									page_limit: v[1],
									page: v[2]
								};
							}
					}
				},
				get: function(p,v){
					switch(p){
						case consts.OP_GET_LISTS:
						case consts.OP_GET_MOVIELISTS:
						case consts.OP_DATA_APIKEY:
						case consts.OP_GET_DVDS:
						case consts.OP_GET_MOVIEINFO:
						case consts.OP_GET_MOVIECAST:
						case consts.OP_GET_MOVIECLIPS:
							return { apikey: consts.VAL_APIKEY };
						case consts.OP_GET_BOXOFFICE:
						case consts.OP_GET_MOVIESIMILAR:
							if(v == null)
								return {apikey: consts.VAL_APIKEY};
							else if(v.length == 1)
								return {apikey: consts.VAL_APIKEY, limit: v[0]};
							else
								return {apikey: consts.VAL_APIKEY, limit: v[0], country: v[1]};
						case consts.OP_GET_INTHEATERS:
						case consts.OP_GET_UPCOMING:
						case consts.OP_GET_CURRENTDVDRELEASES:
						case consts.OP_GET_NEWDVDRELEASES:
						case consts.OP_GET_UPCOMINGDVDS:
							if(v == null)
								return {apikey: consts.VAL_APIKEY};
							else if(v.length == 1)
								return {apikey: consts.VAL_APIKEY, page_limit: v[0]};
							else if(v.length == 2)
								return {apikey: consts.VAL_APIKEY, page_limit: v[0], page: v[1]};
							else
								return {apikey: consts.VAL_APIKEY, page_limit: v[0], page: v[1], country: v[2]};
						case consts.OP_GET_OPENING:
						case consts.OP_GET_TOPRENTALS:
							if(v == null)
								return {apikey: consts.VAL_APIKEY};
							else if(v.length == 1)
								return {apikey: consts.VAL_APIKEY, limit: v[0]};
							else
								return {apikey: consts.VAL_APIKEY, limit: v[0], country: v[1]};
						case consts.OP_GET_MOVIEREVIEWS:
							if(v == null)
								return {apikey: consts.VAL_APIKEY};
							else if(v.length == 1)
								return {apikey: consts.VAL_APIKEY, review_type: v[0]};
							else if(v.length == 2)
								return {apikey: consts.VAL_APIKEY, review_type: v[0], page_limit: v[1]};
							else if(v.length == 3)
								return {apikey: consts.VAL_APIKEY, review_type: v[0], page_limit: v[1], page: v[2]};
							else
								return {apikey: consts.VAL_APIKEY, review_type: v[0], page_limit: v[1], page: v[2], country: v[3]};
						case consts.OP_GET_MOVIEALIAS:
								return {apikey: consts.VAL_APIKEY, type: consts.VAL_ALIAS_IMDB, id: v};
					}
				}
		};
		
		if (methods[o])
			return methods[o].apply( this, Array.prototype.slice.call( arguments, 1 ));
		else
			return null;
	};
	w.RottenTomatoes.genUrl=function(template, data){
		var consts = w.RottenTomatoes.Consts;
		switch(template){
			case consts.URLTEMP_UPCOMINGDVDS_LIST:
			case consts.URLTEMP_MOVIE_CAST:
			case consts.URLTEMP_MOVIE_CLIPS:
			case consts.URLTEMP_MOVIE_REVIEWS:
			case consts.URLTEMP_MOVIE_SIMILAR:
				return template.replace(/\{id\}/gm, data.id);
		}
	};
	
	w.RottenTomatoes.Consts={
			URL_MOVIE_SEARCH: "http://api.rottentomatoes.com/api/public/v1.0/movies.json",
			URL_LISTS: "http://api.rottentomatoes.com/api/public/v1.0/lists.json",
			URL_MOVIE_LISTS: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies.json",
			URL_BOXOFFICE_LIST: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json",
			URL_INTHEATER_LIST: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json",
			URL_OPENINGMOVIES_LIST: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/opening.json",
			URL_UPCOMINGMOVIE_LIST: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json",
			URL_DVD_LIST: "http://api.rottentomatoes.com/api/public/v1.0/lists/dvds.json",
			URL_TOPRENTALS_LIST: "http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/top_rentals.json",
			URL_CURRENTRELEASEDVDS_LIST: "http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/current_releases.json",
			URL_NEWRELEASEDVDS_LIST: "http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/new_releases.json",
			URL_UPCOMINGDVDS_LIST: "http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/upcoming.json",
			URL_MOVIEALIAS_LIST: "http://api.rottentomatoes.com/api/public/v1.0/movie_alias.json",
			
			URLTEMP_MOVIE_INFO: "http://api.rottentomatoes.com/api/public/v1.0/movies/{id}.json",
			URLTEMP_MOVIE_CAST: "http://api.rottentomatoes.com/api/public/v1.0/movies/{id}/cast.json",
			URLTEMP_MOVIE_CLIPS: "http://api.rottentomatoes.com/api/public/v1.0/movies/{id}/clips.json",
			URLTEMP_MOVIE_REVIEWS: "http://api.rottentomatoes.com/api/public/v1.0/movies/{id}/reviews.json",
			URLTEMP_MOVIE_SIMILAR: "http://api.rottentomatoes.com/api/public/v1.0/movies/{id}/similar.json",
			
			OP_SEARCH: "search",
			OP_GET: "get",
			
			OP_MOVIE_SEARCH: "msearch",
			
			OP_GET_LISTS: "glists",
			OP_GET_MOVIELISTS: "gmlists",
			OP_GET_BOXOFFICE: "gboxoffice",
			OP_GET_INTHEATERS: "gintheaters",
			OP_GET_OPENING: "gopening",
			OP_GET_UPCOMING: "gupcoming",
			OP_DATA_APIKEY: "gapikeydata",
			OP_GET_DVDS: "gdvds",
			OP_GET_TOPRENTALS: "gtoprentals",
			OP_GET_CURRENTDVDRELEASES: "gcurdvdreleases",
			OP_GET_NEWDVDRELEASES: "gnewdvdreleases",
			OP_GET_UPCOMINGDVDS: "gupcdvds",
			OP_GET_MOVIEINFO: "gmovieinfo",
			OP_GET_MOVIECAST: "gmoviecast",
			OP_GET_MOVIECLIPS: "gmovieclips",
			OP_GET_MOVIEREVIEWS: "gmoviereviews",
			OP_GET_MOVIESIMILAR: "gmoviesimilar",
			OP_GET_MOVIEALIAS: "gmoviealias",

			VAL_REVIEW_TOPCRITIC: "top_critic",
			VAL_REVIEW_ALL: "all",
			VAL_REVIEW_DVD: "dvd",
			
			VAL_ALIAS_IMDB: "imdb",
			
			VAL_APIKEY: ""
	};
})(window);