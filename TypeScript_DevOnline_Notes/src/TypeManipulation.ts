// import React from "react";

// ==========================================
// THE DOMAIN MODEL BASE TYPES
// ==========================================
type User = {
  id: number;
  age: number;
  name: string;
};

type Profile = {
  id: number;
  title: string;
  age: number;
};

type BlogPost = {
  id: number;
  title: string;
  description?: string;
};

console.log(
  "%c🚀 WELCOME TO THE PINNACLE OF TYPESCRIPT TYPE MANIPULATION",
  "color: #0070f3; font-weight: bold; font-size: 1.2rem;",
);

// ==========================================
// 1. MUTABILITY CONTROL (Mapped Types)
// ==========================================
/*
 * 📘 CONCEPT: Mapped Types iterate through an object's keys using [K in keyof T].
 * By prepending `readonly`, you apply an immutability modifier to every property.
 */
type MakeReadOnly<Type> = {
  readonly [key in keyof Type]: Type[key];
};

type ReadOnlyUser = MakeReadOnly<User>; // Built-in alternative: Readonly<T>

const readOnlyUser: ReadOnlyUser = {
  id: 123,
  age: 22,
  name: "Arka",
};

console.log("\n--- 1. MUTABILITY CONTROL ---");
console.log("readOnlyUser initialized as:", readOnlyUser);
// readOnlyUser[id] = 1; // ❌ COMPILE ERROR: Cannot assign to 'id' because it is a read-only property.
console.log(
  "🔒 Runtime Guarantee: TypeScript completely blocks reassignment to 'readOnlyUser.id' during compilation!",
);

// ==========================================
// 2. PARTIAL IMMUTABILITY (Mixing Mutability)
// ==========================================
/*
 * 📘 CONCEPT: Sometimes you only want certain fields to be immutable.
 * We can combine 'Pick' and 'Omit' to craft custom partial rules.
 */
type CustomPartialReadOnly<T, K extends keyof T> = MakeReadOnly<Pick<T, K>> &
  Omit<T, K>;

type HybridUser = CustomPartialReadOnly<User, "id">; // Only 'id' is readonly, 'age' and 'name' remain mutable.

const hybridUser: HybridUser = { id: 555, age: 30, name: "Alice" };
hybridUser.age = 31; // ✅ Valid! Mutable field updated.
// hybridUser.id = 111; // ❌ COMPILE ERROR: Cannot assign to 'id'.

// ==========================================
// 3. OPTIONAL VS REQUIRED MODIFIERS
// ==========================================
/*
 * 📘 CONCEPT: The `?` makes a key optional.
 * The `-?` prefix is a structural subtraction token that forcibly deletes the optional flag!
 */
type MakeOptional<T> = { [key in keyof T]?: T[key] }; // Built-in alternative: Partial<T>
type MakeRequired<T> = { [key in keyof T]-?: T[key] }; // Built-in alternative: Required<T>

type PartialBlogPost = MakeOptional<BlogPost>;
type RequiredBlogPost = MakeRequired<BlogPost>;

let blogPost: PartialBlogPost = { id: 1, title: "Relax!! I am optional" };
let reqBlogPost: RequiredBlogPost = {
  id: 2,
  title: "Mandatory Post",
  description: "Every single field is strictly demanded here.",
};

console.log("\n--- 3. OPTIONAL VS REQUIRED ---");
console.log("PartialBlogPost (Missing description is fine):", blogPost);
console.log("RequiredBlogPost (Forced description):", reqBlogPost);

// ==========================================
// 4. CHOOSE SPECIFIC FIELDS TO BE OPTIONAL / REQUIRED
// ==========================================
/*
 * 📘 CONCEPT: Advanced pipeline logic. To make only specific fields optional,
 * we strip out those fields from the main type, force them to be optional, and intersect them back.
 */
type PickOptional<T, K extends keyof T> = Omit<T, K> & MakeOptional<Pick<T, K>>;
type PickRequired<T, K extends keyof T> = Omit<T, K> & MakeRequired<Pick<T, K>>;

type CustomUser = PickOptional<User, "age" | "name">; // 'id' stays required, others are optional.
const segmentedUser: CustomUser = { id: 999 }; // Valid!

// ==========================================
// 5. DISTRIBUTIVE CONDITIONAL TYPES & SET OPERATIONS
// ==========================================
/*
 * 📘 CONCEPT: Conditional types filter union keys dynamically.
 * When evaluating T extends U, TypeScript checks every member of the union individually.
 */
type MakeIntersect<T, U> = T extends U ? T : never; // Built-in alternative: Extract<T, U>
type MakeCompliment<T, U> = T extends U ? never : T; // Built-in alternative: Exclude<T, U>

type SharedKeys = MakeIntersect<keyof User, keyof Profile>; // Evaluates to: "id" | "age"
type UniqueUserKeys = MakeCompliment<keyof User, keyof Profile>; // Evaluates to: "name"

console.log("\n--- 5. SET THEORY TYPES (KEY INFRASTRUCTURE) ---");
// Since Types disappear at runtime, we mirror the compilation results to string matrices for beginner evaluation:
const runtimeSharedKeys: SharedKeys[] = ["id", "age"];
const runtimeUniqueUserKeys: UniqueUserKeys[] = ["name"];

console.log(
  "Common Intersection Keys between User and Profile types:",
  runtimeSharedKeys,
);
console.log(
  "Disjoint Complement Keys belonging uniquely to User type:",
  runtimeUniqueUserKeys,
);

// ==========================================
// 6. UNDERSTANDING PICK & OMIT UTILITIES
// ==========================================
/*
 * 📘 LOGICAL INFERENCE OF MAKEPICK:
 * 1. Takes type `T` and a subset of its keys `Keys`.
 * 2. `Keys extends keyof T` ensures you cannot extract keys that do not exist on the target object.
 * 3. The mapped loop `[Key in Keys]` dynamically generates a brand new object type containing only your selected subset.
 */
type MakePick<T, Keys extends keyof T> = {
  [Key in Keys]: T[Key];
}; // Built-in alternative: Pick<T, K>

type MakeOmit<T, Keys extends any> = MakePick<T, MakeCompliment<keyof T, Keys>>; // Built-in alternative: Omit<T, K>

type TinyProfile = MakePick<Profile, "id" | "title">;
type UserWithoutAge = MakeOmit<User, "age">;

const tinyProfile: TinyProfile = { id: 1, title: "Das" };
const userWithoutAge: UserWithoutAge = { id: 456, name: "Arka" };

console.log("\n--- 6. PICK & OMIT EXTRACTIONS ---");
console.log(
  "MakePick result (Profile picked down to id & title):",
  tinyProfile,
);
console.log(
  "MakeOmit result (User with age discarded completely):",
  userWithoutAge,
);

// ==========================================
// 7. Only keep the Required fields in a Object 
// ==========================================
type Product = {
  id: number;
  amount: number;
  name: string;
  description?: string; // this will be filtered out
  discountCoupon?: number; // this will be filtered out
};

type RequiredKeys<Type> = {
  // An empty object {} can be assigned 
  // to an object where all keys are optional, 
  // but it cannot be assigned to an object that has required keys.
  [Key in keyof Type]: {} extends // this Mapped Type Definition // {} - empty object
  // ts job is to take a single,
  // isolated property name and dynamically
  // reconstruct it into a brand-new,
  // tiny object type containing just
  // that one key and its original value type.
  {
    [K in Key]: Type[Key];
  }
    ? never
    : Key;
}[keyof Type];

type OnlyRequiredField<Type> = Pick<Type, RequiredKeys<Type>>;
type OnlyRequiredProduct = OnlyRequiredField<Product>;

const validProduct: OnlyRequiredProduct = {
  id: 20,
  amount: 200,
  name: "handwatch",
  // description: "This is a sasta wrist-watch"; // Uncommenting causes Type errors
  // discountCoupon: 0.2 // Uncommenting causes Type errors
};

// We create a compile-time static assertion rule to verify the exclusion pipeline
// IsDiscountCodePresent evaluates to 'false' in your IDE!
type isDiscountPresent = "discountCoupon" extends keyof OnlyRequiredProduct ? true : false;

console.log("\n🔒 Structural Integrity Verified:");
console.log(
  `Did 'discountCoupon' survive the OnlyRequired filter? -> ${"discountCoupon" in validProduct ? "Yes" : "No"}`,
);

// ==========================================
// 8. LEVEL UP: ADVANCED TEMPLATE LITERAL MUTATIONS
// ==========================================
/*
 * 📘 BONUS CONCEPT: Modern TypeScript allows string manipulation on object properties.
 * We can dynamically alter key signatures (e.g., creating clean API wrappers with getPrefix getters).
 */
type MakeGetterMethods<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = MakeGetterMethods<User>;
/* * UserGetters has been generated entirely through type math as:
 * {
 * getId: () => number;
 * getAge: () => number;
 * getName: () => string;
 * }
 */

console.log("\n--- 7. TEMPLATE LITERAL TYPES ---");
const userAPI: UserGetters = {
  getId: () => 123,
  getAge: () => 22,
  getName: () => "Arka",
};
console.log(
  "Generated API Wrapper Contract Methods via meta-programming String Manipulation:",
);
console.log(" -> userAPI.getId():", userAPI.getId());
console.log(" -> userAPI.getName():", userAPI.getName());
