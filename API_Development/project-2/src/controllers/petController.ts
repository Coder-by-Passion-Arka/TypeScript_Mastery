// controllers/petsController.ts
import type { Request, Response } from "express";
import { Pet, pets } from "../models/pets.js";
import inferShapeFromInstance from "../utils/inferShape.js";

export const listPets = (_req: Request, res: Response) => {
  res.json({ pets });
};

export const createPet = (
    req: Request<Pet[]>, // Only allow Array of Pet objects to be requested
    res: Response<
      | Pet[]
      | {
          error: string;
          expectedSchema: {};
          receivedSample: Pet | null;
        }
    >, // Since we respond with JSON object as a Response, we must specify the 'key' name along with its type
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
};

export const getPetById = (
    req: Request<{ id: string }>, // Enforcing Request to have id to be strictly string
    res: Response<Pet | { error: string }>,
  ) => {
    const { id } = req.params;
    // Iterate through each object in the pets array to find the id that matches with the user requested 'id'
    const pet: Pet | undefined = pets.find((pet: Pet): boolean => {
      // Callback function
      return pet.id.toString() === id;
    });

    if (pet instanceof Pet) 
        res.status(200).json(pet);
    else
      res.status(404).json({
        error: `Pet Object with the given id: ${id} is not found`,
      });
};
