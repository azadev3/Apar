export const api = {
  why_ride: "https://coming.166tech.az/api/rides", 
  social_medias: "https://coming.166tech.az/api/socials", 
  contact_post_req_api: "https://coming.166tech.az/api/contacts", 
  blog: "https://coming.166tech.az/api/blogs", 
  our_collective: "https://coming.166tech.az/api/teams", 
  our_partners: "https://coming.166tech.az/api/partners", 
  wins_of_the_mounth: "https://coming.166tech.az/api/winners", 
  how_to_ride: "https://coming.166tech.az/api/guides", 
  feel_the_difference: "https://coming.166tech.az/api/transports", 
  latest_news: "https://coming.166tech.az/api/news", 
  our_advantages: "https://coming.166tech.az/api/advantages", 
  fun_with_friends: "https://coming.166tech.az/api/ride_texts", 
  korporativ_gedish: "https://coming.166tech.az/api/partner_cards", 
  gedishlere_nezaret: "https://coming.166tech.az/api/partner_features", 
  getting_started_titles: "https://coming.166tech.az/api/contact_titles", 
  translation_words: "https://coming.166tech.az/api/translates", 
  why_rides_content: 'https://coming.166tech.az/api/why_rides', 
  qr_code_data: 'http://coming.166tech.az/api/logo', 
  mobile_socials: 'https://coming.166tech.az/api/mobile_socials', 
  Map: "https://coming.166tech.az/api/map" 
};

export const option = (lang: string) => {
  return {
    headers: {
      "Accept-Language": lang,
    },
  };
};
