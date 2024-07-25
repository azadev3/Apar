export const api = {
  why_ride: "https://coming.166tech.az/api/rides", //bitti
  social_medias: "https://coming.166tech.az/api/socials", //bitti
  contact_post_req_api: "https://coming.166tech.az/api/contacts", //bitti
  blog: "https://coming.166tech.az/api/blogs", //bitti
  our_collective: "https://coming.166tech.az/api/teams", //bitti
  our_partners: "https://coming.166tech.az/api/partners", //bitti
  wins_of_the_mounth: "https://coming.166tech.az/api/winners", //bitti
  how_to_ride: "https://coming.166tech.az/api/guides", //bitti
  feel_the_difference: "https://coming.166tech.az/api/transports", //bitti
  latest_news: "https://coming.166tech.az/api/news", //bitti
  our_advantages: "https://coming.166tech.az/api/advantages", //bitti
  fun_with_friends: "https://coming.166tech.az/api/ride_texts", //bitti
  korporativ_gedish: "https://coming.166tech.az/api/partner_cards", //bitti
  gedishlere_nezaret: "https://coming.166tech.az/api/partner_features", //bitti
  getting_started_titles: "https://coming.166tech.az/api/contact_titles", //bitti
  translation_words: "https://coming.166tech.az/api/translates", //bitti
  why_rides_content: 'https://coming.166tech.az/api/why_rides', //bitti
  qr_code_data: 'http://coming.166tech.az/api/logo', //bitti
  mobile_socials: 'https://coming.166tech.az/api/mobile_socials', //bitti
  Map: "https://coming.166tech.az/api/map" //bitti
};

export const option = (lang: string) => {
  return {
    headers: {
      "Accept-Language": lang,
    },
  };
};
