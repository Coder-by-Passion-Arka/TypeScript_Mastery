import { type PersonProps } from "./Person";

type PersonListProps = {
//   names: {
//     first: string;
//     last: string;
//   }[];
    names: PersonProps[]
};

export const PersonList = (props: PersonListProps) => {
  return (
    <div>
      {props.names.map(
        (name) => {
        // SCENARIO 1: When NOT using type PersonProps
        // PersonListProps would be: {names: {first: string, last: string}[]}
        // return ( // this return is not mandatory (TODO: Check why)
        //   <h2 key={name.first}>
        //     {/* a key is a special string attribute that you must include when creating lists of elements */}
        //     {name.last}
        //   </h2>
        // );

        // SCENARIO 2: When using type PersonProps
        // PersonProps = {name: {first: string, last: string}}
        // PersonListProps = {names: PersonProps[]}
        return (
          <h2 
            key={name.name.first}
            style={{
                backgroundColor: `rgba(186, 15, 15, 0.56)`
            }}
        >
            {name.name.first} {name.name.last}
          </h2>
        );
      })}
    </div>
  );
};
