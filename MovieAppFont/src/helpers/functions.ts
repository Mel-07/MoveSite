import {
  TmdbMovie,
  TmdbSeries,
  TmdbMovieDetail,
  TmdbTVShowDetail,
  Casts
} from "../Types/apptypes";

type Media = TmdbMovie | TmdbSeries | TmdbMovieDetail | TmdbTVShowDetail;

const checkMovieType = (media?:Media,getYear?:boolean|undefined,name?:boolean|undefined) => {

  if(media !== undefined && (getYear === undefined ) &&(name === undefined )){
     return 'media_type' in media && media.media_type === 'movie'? 'Movie' :'Tv Series'
  }
  else if(media !== undefined && getYear === true){
    return year(media)?.split("-")[0];
  }
  else if(media !== undefined && name == true){
        if ("title" in media) {
          return media?.title;
        } else if ("name" in media) {
          return media?.name;
        }
  }
  // else if(media === undefined && getYear === undefined && name === undefined){
  //   throw new Error('Check if Media Or GetYear are Set')
  // }
};

/*or*/

const checkMedianType = (media_type:string|null)=>{

  if (media_type === null){
    return;
  }

  const type = media_type === "movie" ? "Movie" : "Tv Series";

  return type
}

const year = (media:Media)=>{
    if('first_air_date' in media){
        return media.first_air_date
    }else if('release_date' in media){
        return media.release_date
    }
}

const convertRating = (rate?: number | string) => {
  if (rate === undefined) {
    return 0;
  }
  const convertToNumber = typeof rate === "string" ? parseFloat(rate) : rate;
  if (isNaN(convertToNumber)) {
    return 0;
  }
  const roundUpTwoDecimal = parseFloat(convertToNumber.toFixed(1));

  return roundUpTwoDecimal
};

const joinAndRandomizeArray =<T> (randomize?:boolean,...args:T[][]):T[]=>{
  const jointArray = args.flat(1)
  const arrayOfArgs = args.reduce((acc, val) => acc.concat(val), [] as T[]);
  for (let i = arrayOfArgs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayOfArgs[i], arrayOfArgs[j]] = [arrayOfArgs[j], arrayOfArgs[i]];
  }
  if(randomize){
    return [arrayOfArgs] as T[]
  }

  return [arrayOfArgs,jointArray] as T[];

}


const shortMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getFullDate = (details:TmdbMovieDetail|TmdbTVShowDetail)=>{

  const date =
    details && "release_date" in details
      ? details.release_date
      : details && "first_air_date" in details
      ? details.first_air_date
      : "";


  if(date === null){
    return;
  }
  const splitDate = date.split("-");
  const year =  splitDate[0]
  const month = Number(splitDate[1]);
  const day = splitDate[2]

  return [day,"/",shortMonths[month - 1],"/",year].join('');
}


// calculate runtime

const calculateRuntime =(runtime:number|null)=>{
  if(runtime === null){
    return;
  }

  const convertToHours = runtime /60

  const hour = Number(convertToHours.toString().split(".")[0]);

  const minute = runtime -(hour*60)

  return `${hour}hr : ${minute}min`
  
}

const limitNumberOfCast = (cast:Casts[]|[]):Casts[]=>{
const newCast =
    cast?.length > 10
      ? cast.slice(0,10)
      : cast;
      return newCast
}

/* page number */

const getPageNumberArray = (pageNumber:number):number[]=>{
  return Array.from({ length: pageNumber }).map((_, i) => i+1);
}


export{
    checkMovieType,
    convertRating,
    joinAndRandomizeArray,
    getFullDate,
    checkMedianType,
    calculateRuntime,
    limitNumberOfCast,
    getPageNumberArray
}