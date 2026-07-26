// Small helper to infer a runtime shape from a Pet instance

export default function inferShapeFromInstance(instance: any): any {
  const seen = new WeakSet();
  function infer(val: any): any {
    if (val === null) return "null";

    if (val === undefined) return "undefined";

    if (val instanceof Date) return "Date";

    if (Array.isArray(val))
      return `Array<${val.length ? infer(val[0]) : "any"}>`;

    if (typeof val === "object") {
      // If the same object was already visited, return "[Circular]".
      // This avoids infinite recursion on self-references.
      if (seen.has(val)) return "[Circular]";

      seen.add(val); //Mark this object as visited before processing its keys.

      const out: any = {}; // Create a new plain object to hold the inferred shape.

      // Loop over own enumerable keys of the object.
      // Recursively infer the shape of each property value.
      // Store the result back into out.
      for (const k of Object.keys(val)) out[k] = infer(val[k]);

      return out;
    }
    // This is the fallback for primitive values.
    // For strings it returns "string", for numbers "number", for booleans "boolean", etc.
    // It also covers functions and symbols if they ever appear.
    return typeof val;
  }

  return infer(instance); // Calls the nested helper with the original. Starts the whole process
}
