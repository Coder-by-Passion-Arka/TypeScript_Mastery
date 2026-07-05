import "./index.css";
import { Greet } from "./components/Greet";
import { Person } from "./components/Person";
import { PersonList } from "./components/PersonList";
import { Status } from "./components/Status";
import { List } from "./components/generics/List";
import { Counter } from "./components/class/Counter";
import { Private } from "./components/auth/Private";
import { Profile } from "./components/auth/Profile";
import { Toast } from "./components/template/Toast";
import { Text } from "./components/Text";

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
      },
    },
  ];

  return (
    <div>
      <Greet name="Arka" messageCount={20} isLoggedIn={true} />
      <Person name={personName} />
      <PersonList names={nameList} />
      <Status status="loading" />
      {/*
       * Can be one of these 3 values:
       *   "success"
       *   "error"
       *   "loading"
       */}
      <List
        // items={["Arka", "Arita", "Ahana"]}
        items={[1, 2, 3]}
        handleOnClick={(item: any) => console.log(item)}
      />
      <Counter message="Counter" />
      <Private isLoggedIn={true} Component={Profile}></Private>
      <Toast position="right-top" />
      <div
        className="text-area"
        style={{
          backgroundColor: "lightgrey",
          color: "black",
          border: "black dashed",
          margin: "5px",
          padding: "1rem"
        }}
      >
        <h2>Text Area to display Polymorphic Components</h2>
        <section>
          <Text as="h1" size="lg">
            H1 React Element
          </Text>
          <Text as="h2" size="md">
            H2 React Element
          </Text>
          <Text as="p" size="sm">
            Paragraph Element
          </Text>
        </section>
      </div>
    </div>
  );
}
