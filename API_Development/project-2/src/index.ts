import express from "express";
import type { Express, Request, Response } from "express";

const app: Express = express();

app.use(express.json());

// Import Pet Class from the Models Folder
import Pet from "./models/pets.js";

// Register a single Pet
const pet: Pet = new Pet({
  name: "Bob", 
  species: "Dog", 
  breed: "Dalmatian", 
  adopted: true, 
  age: 3,
  intakeDate: "2022-10-09",
  adoptionDate: "2026-08-01",
    medicalRecord: {
        vaccinations: ["Rabies", "Fleas"],
        weightKg: 50,
        microchipId: null
    },
    photo: ""
});

app.get("/", (_, res: Response) => {
  res.json({ pet });
});

// Make an entire of array of Pets
const pets: Pet[] = [];

// Small helper to infer a runtime shape from a Pet instance
function inferShapeFromInstance(instance: any): any {
  const seen = new WeakSet();
  function infer(val: any): any {
    if (val === null) return "null";

    if (val === undefined) return "undefined";

    if (val instanceof Date) return "Date";

    if (Array.isArray(val))
      return `Array<${val.length ? infer(val[0]) : "any"}>`;

    if (typeof val === "object") 
    {
      // If the same object was already visited, return "[Circular]".
      // This avoids infinite recursion on self-references.
      if (seen.has(val)) return "[Circular]";

      seen.add(val); //Mark this object as visited before processing its keys.

      const out: any = {}; // Create a new plain object to hold the inferred shape.

      // Loop over own enumerable keys of the object.
      // Recursively infer the shape of each property value.
      // Store the result back into out.
      for (const k of Object.keys(val)) 
        out[k] = infer(val[k]);

      return out;
    }
    // This is the fallback for primitive values.
    // For strings it returns "string", for numbers "number", for booleans "boolean", etc.
    // It also covers functions and symbols if they ever appear.
    return typeof val;
  }

  return infer(instance); // Calls the nested helper with the original. Starts the whole process
}

app.post("/pets", (
        req: Request<Pet[]>, // Only allow Array of Pet objects to be requested 
        res: Response<any> // I can't seem to figure out a suitable type for Response Obj 
    ) => {
    const petData: Pet = req.body;

    if (
        !petData ||
        typeof petData.name !== "string"
        // petData instanceof Pet //  express.json() gives you a plain object (no Pet prototype)
        // instanceof only returns true if the object was created with new Pet(...) (i.e., its prototype chain points at Pet.prototype). So the parsed request body will normally make instanceof Pet false even when it has all the correct properties.
    ) {
        const expectedSchema = inferShapeFromInstance(new Pet("example"));
        return res.status(400).json({
            error: "Invalid pet payload",
            expectedSchema,
            receivedSample: petData ?? null,
        });
    }

    // Add the newly created Pet into the array
    pets.push(Pet.addPet(petData as Pet));
    res.status(201).json(pets);
});

// API Endpoint to access the entire array of Pets
app.get("/pets", (_, res: Response) => {
  res.json({ pets });
});

const PORT = 8000;
app.listen(PORT, (): void => {
  console.log(`Listening on PORT: ${PORT}`);
});