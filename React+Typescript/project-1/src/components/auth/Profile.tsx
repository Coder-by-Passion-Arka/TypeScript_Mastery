export type ProfileProps = {
    name: string
}

export const Profile = (props: ProfileProps) => {
    return <>
        <div>Private Profile Component. Welcome {props.name}</div>
    </>
};