export type PersonProps = {
    name: {
        first: string,
        last: string
    }
}
export const Person = (props: PersonProps = {
    // this a default placeholder object
    name: {
        first: "Arka",
        last: "Das"
    }
}) => {
    return (
        <div>
            {props.name.first} 
            {props.name.last}
        </div>
    );
};