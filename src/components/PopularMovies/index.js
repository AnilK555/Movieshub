import {Component} from 'react'
import './index.css'

class PopularMovies extends Component {
  imgContainer = dataList =>
    dataList.map(each => (
      <div key={each.id} className="cont-size">
        <img
          className="picture"
          id={each.id}
          src={`https://image.tmdb.org/t/p/original/${each.posterPath}`}
          alt={each.originalTitle}
        />
      </div>
    ))

  render() {
    const {dataList} = this.props

    return <div className="cont-pop">{this.imgContainer(dataList)}</div>
  }
}

export default PopularMovies
