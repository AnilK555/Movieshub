import {Component} from 'react'

import './index.css'

import Responsive from '../LineFormat'
import TopHome from '../TopPage'

const apiKey = 'acbcb8763beac3e278464ebad65e4483'

class HomePage extends Component {
  state = {
    trending: [],
    topRated: [],
    original: [],
    singleTop: [],
  }

  componentDidMount() {
    this.trendingMovies(apiKey)
    this.topRatedMovies(apiKey)
    this.originalMovies(apiKey)
  }

  trendingMovies = async key => {
    const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${key}`
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
      this.setState({trending: updatedData})
    }
  }

  clickImage = id => {
    console.log(id)
  }

  topRatedMovies = async key => {
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(result => ({
        backdropPath: result.backdrop_path,
        originalTitle: result.title,
        posterPath: result.poster_path,
        overview: result.overview,
        id: result.id,
      }))
      const singleData =
        updatedData[Math.floor(Math.random() * updatedData.length)]
      this.setState({topRated: updatedData, singleTop: singleData})
    }
  }

  originalMovies = async key => {
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${key}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(result => ({
        backdropPath: result.backdrop_path,
        originalTitle: result.name,
        posterPath: result.poster_path,
        id: result.id,
      }))
      this.setState({original: updatedData})
    }
  }

  render() {
    const {trending, topRated, original, singleTop} = this.state
    return (
      <div className="background">
        <TopHome dataList={singleTop} />
        <div className="second-part">
          <Responsive
            heading="Trending Now"
            dataList={trending}
            clickImage={this.clickImage}
          />
          <Responsive
            heading="Top Rated"
            dataList={topRated}
            clickImage={this.clickImage}
          />
          <Responsive
            heading="Originals"
            dataList={original}
            clickImage={this.clickImage}
          />
        </div>
      </div>
    )
  }
}
export default HomePage
