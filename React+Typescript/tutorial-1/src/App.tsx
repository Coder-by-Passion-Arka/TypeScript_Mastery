import "./index.css";
import { Greet } from "./components/Greet";
import { Person } from "./components/Person";
import { PersonList } from "./components/PersonList";
import {Status} from "./components/Status"

export default function App() {
  const personName = {
    first: "Bruce",
    last: "Wayne",
  };

  const nameList = [
    {
      name: {
        first: "Arka",
        last: "Das",
      },
    },
    {
      name: {
        first: "Arka",
        last: "Das",
      },
    },
    {
        name: {
        first: "Arka",
        last: "Das",
      }
    },
  ];

  return (
    <div>
      <Greet name="Arka" messageCount={20} isLoggedIn={true} />
      <Person name={personName} />
      <PersonList names={nameList} />
      <Status status="loading"/> 
      {/*
      * Can be one of these 3 values:
      *   "success"
      *   "error"
      *   "loading"
      */}
    </div>
  );
}
