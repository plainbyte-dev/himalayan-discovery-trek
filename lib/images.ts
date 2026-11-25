// Image paths follow a fixed naming convention so photos can be swapped by dropping in a file:
//   /images/trips/{trip.id}-hero.jpg    wide hero, 16:9 (up to 2560×1440)
//   /images/trips/{trip.id}-card.jpg    portrait card, 3:4
//   /images/regions/{slug}-hero.jpg     wide hero, 16:9
//   /images/regions/{slug}-card.jpg     portrait card, 3:4
//
// Sources (company photos, downloaded by download-images.sh into public/images/):
// - Trips: the photo named by `images.hero` in data/himalayan-trips.json, cropped. No crop is
//   upscaled, so a few heroes are smaller than 2560 px (largest source is 1920 px wide).
// - Regions: the official region photos are 599×449 (too small for a hero) except Everest, so
//   Annapurna, Langtang, Mustang and Manaslu use a large trip photo from that region instead.
// When you replace a photo, update its alt text below to describe the new image.

export const tripImages = (id: string) => ({
  hero: `/images/trips/${id}-hero.jpg`,
  card: `/images/trips/${id}-card.jpg`,
  alt: TRIP_ALTS[id] ?? "",
});

export const regionImages = (slug: string) => ({
  hero: `/images/regions/${slug}-hero.jpg`,
  card: `/images/regions/${slug}-card.jpg`,
  alt: REGION_ALTS[slug] ?? "",
});

/** Nepal destination photo (destinations[nepal].image in the trip data). */
export const nepalImage = {
  hero: "/images/destinations/nepal-hero.jpg",
  alt: "Snow-covered Annapurna peaks and the pointed summit of Machapuchare rising above a sea of cloud",
};

// Alt text describes what each photo shows, not the trip name (the page already says that)
const PHOTO = {
  trekkerCairn: "Trekker in a red jacket standing beside a stone cairn, looking down a cloud-filled Khumbu valley",
  everestGlacier: "Everest and Nuptse rising above the Khumbu Glacier under a deep blue sky",
  terraceView: "Stone terrace with wooden benches facing a row of snowy peaks, with Ama Dablam on the right",
  gokyoLakes: "Turquoise lakes in the Gokyo valley beneath snow-capped peaks",
  sanctuaryPeak: "Snow-covered peak above a rocky valley with golden grass slopes in the Annapurna Sanctuary",
  sanctuaryGrass: "Golden grass slopes leading up to snowy peaks in the Annapurna Sanctuary",
  forestMassif: "Huge snow-covered massif framed by pine forest and a steep rocky ridge",
  sunriseRange: "Snowy Himalayan range in early light, seen over prayer flags and golden grass",
  fishtail: "The sharp fishtail summit of Machapuchare against a deep blue sky above grassy ridges",
  langtangLodges: "Stone teahouses on a green meadow below snow-capped mountains",
  stupa: "Gold-topped Buddhist stupa with prayer flag poles on a grassy hilltop",
  mustangVillage: "Village and hilltop monastery among green trees in a dry brown valley below snowy peaks",
  erodedCliffs: "Eroded sandstone cliffs above a wide dry river valley, with snowy peaks behind",
  pagodaTemple: "White pagoda-roofed temple in a stone courtyard at Muktinath",
  glacialLake: "Turquoise glacial lake in a valley below snow-covered peaks",
  moraine: "Rocky glacial moraine stretching toward a line of snow-covered peaks",
  everestNuptse: "Everest and Nuptse above the Khumbu icefall and glacier",
};

const TRIP_ALTS: Record<string, string> = {
  "everest-base-camp-trek": PHOTO.trekkerCairn,
  "everest-base-camp-with-jiri": PHOTO.everestGlacier,
  "everest-panorama-trekking": PHOTO.terraceView,
  "gokyo-chola-ebc-trek": PHOTO.gokyoLakes,
  "annapurna-base-camp-trekking": PHOTO.sanctuaryPeak,
  "annapurna-circuit-trekking": PHOTO.forestMassif,
  "ghorepani-poon-hill-trekking": PHOTO.sunriseRange,
  "mardi-himal-trekking": PHOTO.fishtail,
  "langtang-valley-and-gosaikunda-trek": PHOTO.langtangLodges,
  "helambu-valley-trekking": PHOTO.stupa,
  "upper-mustang-trekking": PHOTO.mustangVillage,
  "muktinath-jomsom-trekking": PHOTO.erodedCliffs,
  "manaslu-round-trekking": PHOTO.glacialLake,
  "manaslu-tsum-valley-trek": PHOTO.moraine,
};

const REGION_ALTS: Record<string, string> = {
  everest: PHOTO.everestNuptse,
  annapurna: PHOTO.sanctuaryGrass,
  langtang: PHOTO.langtangLodges,
  mustang: PHOTO.pagodaTemple,
  manaslu: PHOTO.moraine,
};
