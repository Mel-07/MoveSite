
interface Props{
    overview:string|null
}
function OverView({overview}:Props) {
  return (
    overview && (
      <div className="overview">
        <span className="overview-heading">Overview:</span>

        <p className="overview-paragraph">{overview}</p>
      </div>
    )
  );
}

export default OverView