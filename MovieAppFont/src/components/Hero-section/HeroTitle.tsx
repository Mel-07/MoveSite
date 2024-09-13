

interface Props extends React.ComponentPropsWithoutRef<"h1"> {
  title?: string;
  year?:string|number
}

function HeroTitle({title,year, ...props }:Props) {
  return <h1{...props} style={{
    cursor:'pointer'
  }} className=" hero-title text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-big_Shoulders">
  <span>{title}</span> <span>{year}</span>
  </h1>;
}

export default HeroTitle;
