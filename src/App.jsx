import React, { useState, useEffect } from "react";
import "./App.css";
import Loading from "./Loading";
import Tours from "./Tours";
const url = "https://course-api.com/react-tours-project";
function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  async function fetchTours() {
    let data = await fetch(url);
    let json = await data.json();
    setTours(json)
    setLoading(false)
  }
   function removeTour(id){
    const filteredTour = tours.filter((tour) => tour.id != id)
    setTours(filteredTour)
  }

  useEffect(() => {
    fetchTours()
  }, [])

  if(tours.length === 0){
    return (
      <main>
        <div className="title">
          <h2>No Tours Left</h2>
          <button className="btn" onClick={ fetchTours}>Refresh</button>
        </div>
      </main>
    )
  }

  return loading ? (
    <main>
      <Loading />
    </main>
  ) : (
    <main>
      <Tours tours= { tours} removeTour ={removeTour}/>
    </main>
  )
}

export default App;
