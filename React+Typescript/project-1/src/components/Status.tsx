type StatusProps = {
    status: 'loading' | 'success' | 'error'
}

export const Status = (props: StatusProps) => {
    let message: string = "";
    if(props.status === "loading"){
        message = "Loading..."
    }
    else if (props.status === "success") {
      message = "Data fetching successful";
    }
    else if (props.status === "error"){
        message = "Error in fetching data!"
    }
    else{
        // Should not reach this condition
        message = "Undefined state"
    }
    return(
        <div>
            <h2>Status - {message}</h2>
        </div>
    );
};