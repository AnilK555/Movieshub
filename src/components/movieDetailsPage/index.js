const MovieDetailsPage = props => {
  const {match} = props
  const {params} = match
  const {id} = params

  return (
    <div>
      <h1>Hi this is our required{id}</h1>
    </div>
  )
}

export default MovieDetailsPage
