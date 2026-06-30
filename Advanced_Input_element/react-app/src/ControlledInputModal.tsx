import React from "react";

type InputProps = {
  name: string;
  type: string;
};

type OnChangeProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

type RenderProp =
  | { render: (OnChangeProps: OnChangeProps) => React.JSX.Element }
  | { children: (OnChangeProps: OnChangeProps) => React.JSX.Element };

type ExpandedOnChangeProps = {
  initialValue: string;
} & RenderProp;

// FIX 1: Defined the missing OnChangeState type
type OnChangeState = {
  value: string;
};

const Input = ({ value, onChange, type, name }: InputProps & OnChangeProps) => (
  <input type={type} name={name} value={value} onChange={onChange} />
);

class OnChange extends React.Component<ExpandedOnChangeProps, OnChangeState> {
  state = {
    value: this.props.initialValue,
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    this.setState({ value: target.value });
  };

  render() {
    if ("render" in this.props) {
      return this.props.render({
        value: this.state.value,
        onChange: this.onChange,
      });
    }

    if ("children" in this.props) {
      return this.props.children({
        value: this.state.value,
        onChange: this.onChange,
      });
    }

    throw new Error("A children or render prop has to be defined");
  }
}

type ControlledInputProp = InputProps & { initialValue: string };

export const ControlledInput = ({
  initialValue,
  ...props
}: ControlledInputProp) => {
  // FIX 2: Added explicit 'return' statement for ControlledInput
  return (
    <OnChange
      initialValue={initialValue} // FIX 4: Passed down initialValue
      // FIX 3: Rewrote render arrow function to use implicit return (parentheses instead of braces)
      render={(onChangeProps) => <Input {...props} {...onChangeProps} />}
    />
  );
};
