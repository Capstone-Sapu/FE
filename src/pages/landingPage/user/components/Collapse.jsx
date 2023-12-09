
import './css/collapse.css'
const Collapse = () => {
  return (
    <>
       <div id="carouselExampleFade" className="carousel slide carousel-fade">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="public/hero2.png" className="d-block w-100" alt="Poster-1"  style={{height: '70vh'}}/>
          </div>
          <div className="carousel-item">
            <img src="public/hero3.jpeg" className="d-block w-100" alt="Poster-2" style={{height: '70vh'}}/>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  )
}

export default Collapse
