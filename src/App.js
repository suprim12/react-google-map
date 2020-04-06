import React from 'react'
import './app.css'
import Map from './Map'

const App = () => {
  return (
    <div className="google-wrapper">
      <form>
        <h1 className="section-title">Google Map</h1>
        <Map
          center={{ lat: 27.710036, lng: 85.317550 }}
          height='400px'
          zoom={15}
        ></Map>
      </form>
    </div>
  )
}

export default App
