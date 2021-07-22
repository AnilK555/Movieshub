import {Component} from 'react'
import PopularMovies from '../PopularMovies'
import Header from '../NavBar'

const apiKey = 'acbcb8763beac3e278464ebad65e4483'
class SearchMovie extends Component {
  state = {searchMoviesData: [], number: 1, lengthData: 1, searchInput: ''}

  componentDidMount() {
    const {number, searchInput} = this.state
    this.searchMovies(apiKey, number, searchInput)
  }

  onIncrementCount = () => {
    const {number, searchInput, lengthData} = this.state
    if (number > lengthData) {
      this.setState({number: 20})
      this.searchMovies(apiKey, 20, searchInput)
    } else {
      this.setState(prevState => ({number: prevState.number + 1}))
      this.searchMovies(apiKey, number + 1, searchInput)
    }
  }

  updateInput = value => {
    this.setState({searchInput: value}, this.searchMovies)
  }

  onDecrementCount = () => {
    const {number, searchInput} = this.state
    if (number <= 1) {
      this.setState({number: 1})
      this.searchMovies(apiKey, 1, searchInput)
    } else {
      this.setState(prevState => ({number: prevState.number - 1}))
      this.searchMovies(apiKey, number - 1, searchInput)
    }
  }

  searchMovies = async (key, number, aim) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${aim}&page=${number}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(result => ({
        backdropPath: result.backdrop_path,
        originalTitle: result.original_title || result.original_name,
        posterPath: result.poster_path,
        id: result.id,
      }))
      this.setState({
        searchMoviesData: updatedData,
        lengthData: data.results.length,
      })
    }
  }

  render() {
    const {searchMoviesData, number, lengthData} = this.state
    const indicator1 = '<'
    const indicator2 = '>'
    return (
      <div className="container">
        <Header updateInput={this.updateInput} />
        <PopularMovies dataList={searchMoviesData} />
        <div className="buttons-cont">
          <button
            type="button"
            className="button-box"
            onClick={this.onDecrementCount}
          >
            {indicator1}
          </button>
          <p className="pages">{`${number} of ${lengthData}`}</p>
          <button
            type="button"
            className="button-box"
            onClick={this.onIncrementCount}
          >
            {indicator2}
          </button>
        </div>
        <div className="social-cont">
          <img
            alt="social-media"
            src="https://res.cloudinary.com/dnmsqpiu8/image/upload/v1626275935/icon_img_t2phft.png"
          />
          <p className="pages">Contact Us</p>
        </div>
      </div>
    )
  }
}
export default SearchMovie
