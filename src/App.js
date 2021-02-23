import { useEffect, useRef, useState } from 'react';
import faker from "faker"
import './App.css';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';


const App = () => {
  {/* create fake data */ }
  const [people, setPeople] = useState([])
  const [time, setTime] = useState(new Date())
  const cache = useRef(new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100,
  }))
  //useEffect to change state on componentDidMount
  useEffect(() => {
    setPeople(
      //generate 100 random records 
      // map 100 random keys
      [...Array(10000).keys()].map((key) => ({
        // return object with key/value pairs
        id: key,
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        //generate lorem ipsum random lines between 0 and 100
        bio: faker.lorem.lines(Math.random() * 100)

      }))
    )
  }, [])
  // console.log(people)
  useEffect(() => {
    //component did mount
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000);
    //componentWillUnMount
    return () => clearInterval(interval)

  }, [])

  return (
    <div className="App">
      <h1>{time.toISOString()}</h1>
      {/* <ul>
        {people.map((person) => <li key={person.id}>
          <h2>{person.name}</h2>
        </li>)}
      </ul> */}


      {/* cell measurer measures rowHeight */}
      {/* Autosizer fix the height according to the content*/}
      <div style={{ width: "100%", height: "100vh" }}>
        <AutoSizer>
          {({ width, height }) => (
            <List width={width} height={height}
              rowHeight={cache.current.rowHeight}
              deferredMeasurementCache={cache.current}
              rowCount={people.length}
              rowRenderer={({ key, index, style, parent }) => {
                //row renderer is a callback that renders (calls for) each row 
                // console.log(style, parent)
                const person = people[index]
                // console.log(person.name)

                return <CellMeasurer key={key} cache = {cache.current} parent = {parent} columnIndex = {0} rowIndex = {index}>
                  <div  style={style}>
                    <h2>{person.name}</h2>
                    <p>{person.bio}</p>
                  </div>
                </CellMeasurer>
              }} />
          )}
        </AutoSizer>
      </div>
    </div>
  );
}

export default App;
