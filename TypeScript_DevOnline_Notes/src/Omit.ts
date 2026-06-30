interface ExtractName {
    name: string;
}

// Set Logic 
function removeName<
    Props extends ExtractName // the Prop type must atleast have the attributes of ExtractName
>(props: Props): Pick<Props, Exclude<keyof Props, keyof ExtractName>> {
    const {name, ...rest} = props;
    console.log(`Processing name: ${name.toUpperCase()}`);
    return rest;
}

// In-built `Omit` utility type
function onlyName<
Props extends ExtractName
>(props: Props): Omit<
        Props, 
        keyof ExtractName
    > {
    const {name, ...rest} = props;
    console.log(`Processing name: ${name.toUpperCase()}`);
    return rest;
}

interface UserProps {
    id: number;
    name: string;
    role: string;
}

const employee: UserProps = {
    id: 101,
    name: "Alice",
    role: "Engineer"
};

// // 1. Harder (More Intuitive Way)
// const getEmployeeName = removeName(employee);
// console.log(getEmployeeName);

// 2. Cleaner Way
const employeeName = onlyName(employee);
console.log(employeeName);

