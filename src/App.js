import './App.css'

function App() {
  return (
    <div className="App">
      <SlideShow/>
    </div>
  )
}

function SlideShow() {
  return (
    <div className="SlideShow">
      <div className="Slide" style={ { backgroundImage : 'url(media/00-01.jpg)' } }/>
      <div className="Slide" style={ { backgroundImage : 'url(media/01-0_Квартира_для_родителей.jpg)' } }/>
      <div className="Slide" style={ { backgroundImage : 'url(media/01-1_Квартира_для_родителей.jpg)' } }/>
    </div>
  )
}

export default App
