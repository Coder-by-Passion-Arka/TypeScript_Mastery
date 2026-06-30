/**
 * String variable
 * @type {string}
 */
const studentName = "John Doe"

/**
 * Number Variable
 * @type {number}
 */
const ageOfStudent = 12

/**
 * @type {Array<number>}
 */

const studentGrades = [12, 1, 10, 50]

/**
 * @type {{
 *  id: number|string,
 *  text: string
 * }}
 */
const todo = {
    id: 1,
    text: "Hello"
}

/**
 * Calculate Tax
 * @param {number} amount 
 * @param {number} tax 
 * @returns {string}
 */
const calculateTax = (amount, tax) => {
    return `$${amount + tax * amount}`;
};

console.log(calculateTax(100, 0.5));

/**
 * A Custom Object
 * @typedef {Object} Student
 * @property {number} id
 * @property {string} name 
 * @property {string | number} [age] - Optional object attribute 
 * @property {boolean} isActive 
 */

/**
 * @type {Student}
 */
const student = {
    id: 1,
    name: "Arka",
    age: 22,
    isActive: true
}