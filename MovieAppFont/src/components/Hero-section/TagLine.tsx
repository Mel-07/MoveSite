
interface Props{
    tagline:string|null
}
function TagLine({tagline}:Props) {
  return (
    <div className="tagline">{tagline}</div>
  )
}

export default TagLine