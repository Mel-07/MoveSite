import { joinAndRandomizeArray } from "../helpers/functions";
const idSAndTypes = [
  { id: 113988, media_type: "tv" },
  { id: 315011, media_type: "movie" },
  { id: 1399, media_type: "tv" },
  { id: 84773, media_type: "tv" },
  { id: 137113, media_type: "movie" },
  { id: 111803, media_type: "tv" },
  { id: 90669, media_type: "tv" },
  { id: 126308, media_type: "tv" },
  { id: 90802, media_type: "tv" },
  { id: 83867, media_type: "tv" },
  { id: 91314, media_type: "movie" },
  { id: 114479, media_type: "tv" },
  { id: 114410, media_type: "tv" },
  { id: 293167, media_type: "movie" },
  { id: 157353, media_type: "movie" },
  { id: 252838, media_type: "movie" },
  { id: 53182, media_type: "movie" },
  { id: 254473, media_type: "movie" },
  { id: 92783, media_type: "tv" },
  { id: 97020, media_type: "movie" },
  { id: 157350, media_type: "movie" },
  { id: 251519, media_type: "movie" },
  { id: 195589, media_type: "movie" },
  { id: 119450, media_type: "movie" },
  { id: 67070, media_type: "tv" },
  { id: 137106, media_type: "movie" },
  { id: 100402, media_type: "movie" },
  { id: 203085, media_type: "tv" },
  { id: 102382, media_type: "movie" },
  { id: 929, media_type: "movie" },
  { id: 95403, media_type: "tv" },
  { id: 127585, media_type: "movie" },
  { id: 76479, media_type: "tv" },
  { id: 119051, media_type: "tv" },
  { id: 124364, media_type: "tv" },
  { id: 100088, media_type: "tv" },
  { id: 373571, media_type: "movie" },
  { id: 136315, media_type: "tv" },
];

const mixed = joinAndRandomizeArray(true,idSAndTypes);

const data = mixed[0] as unknown;

const newdata = data as Array<{id:number,media_type:string}>

export {
    newdata
}
