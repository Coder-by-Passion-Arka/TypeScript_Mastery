import { Component, type ReactNode } from "react";

type CounterProps = {
    message: string;
}

type CounterState = {
    count: number;
}

export class Counter extends Component<CounterProps, CounterState> {
    state = { count: 0 } // default counter value set to 0
    
    handleClick = () => {
        this.setState(
            (prevState) => ({count: prevState.count + 1})
        );
    };

    render(): ReactNode {
        return (
          <div>
            <h3 style={{
                backgroundColor:"lightblue"
            }}>This is a Counter Class Object</h3>
            <button onClick={this.handleClick}>Increment</button>
            {"  "}
            {this.props.message + " "}- {this.state.count}
          </div>
        );
    }
}
