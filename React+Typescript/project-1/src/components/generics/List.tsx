import type { ReactNode } from "react";

// A simple List Component that accept strings as elements
type SimpleListProps = {
  items: string[];
  handleOnClick: (value: string) => void;
};
export const SimpleList = (props: SimpleListProps) => {
  return (
    <div>
      <h2
        style={{
          background: `rgba(20, 245, 0, 0.73)`,
        }}
      >
        List of Elements (React.ReactNode)
      </h2>
      <ul>
        {props.items.map((item, index) => {
          return (
            <li key={index} onClick={() => props.handleOnClick(item)}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// A Generic Prop (Type T) JSX Element
type ListProps<T extends ReactNode> = {
  items: T[];
  handleOnClick: (value: T) => void;
};
export const List = <T extends ReactNode>(props: ListProps<T>) => {
  return (
    <div>
      <h2
        style={{
          background: `rgba(20, 245, 0, 0.73)`,
        }}
      >
        List of Elements (React.ReactNode)
      </h2>
      <ul>
        {props.items.map((item, index) => {
          return (
            <li key={index} onClick={() => props.handleOnClick(item)}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
