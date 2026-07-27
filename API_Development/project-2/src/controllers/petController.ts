// controllers/petsController.ts
import type { Request, Response } from "express";
import { Pet, pets } from "../models/petSchema.js";
import inferShapeFromInstance from "../utils/inferShape.js";

// 1. Get all the Pet obj created
export const listPets = (_req: Request, res: Response) => {
  res.json({ pets });
};

// 2. Create a new Pet Obj
export const createPet = (
  req: Request<Pet[]>, // Only allow Array of Pet objects to be requested
  res: Response<
    | Pet[]
    | {
        error: string;
        expectedSchema: {};
        receivedSample: Pet | Pet[] | null;
      }
  >, // Since we respond with JSON object as a Response, we must specify the 'key' name along with its type
) => {
  // Our API by default takes an array of Pet Objects. If there be a single Pet object, then we are creating A pet or else, we are creating many Pets
  const petData: Pet[] = req.body.pets ?? req.body; // Get the pets array

  if (
    !petData ||
    typeof petData[0]?.name !== "string"
    // petData instanceof Pet //  express.json() gives you a plain object (no Pet prototype)
    // instanceof only returns true if the object was created with new Pet(...) (i.e., its prototype chain points at Pet.prototype). So the parsed request body will normally make instanceof Pet false even when it has all the correct properties.
  ) {
    const expectedSchema = inferShapeFromInstance(new Pet("example"));
    return res.status(400).json({
      error: "Invalid pet payload",
      expectedSchema,
      receivedSample: petData[0] ?? null,
    });
  }

  // Add the newly created Pet(s) into the array
  for (const pet of petData) pets.push(Pet.addPet(pet as Pet));

  res.status(201).json(pets);
};

// 3. Get a specific Pet Obj by ID
export const getPetById = (
  req: Request<{ id: string }>, // Enforcing Request to have id to be strictly string
  res: Response<Pet | { error: string }>,
) => {
  let { id } = req.params;
  if (!id.match("pet")){
    id = "pet-" + id;
  }

  // Iterate through each object in the pets array to find the id that matches with the user requested 'id'
  const pet: Pet | undefined = pets.find((pet: Pet): boolean => {
    // Callback function
    return pet.id.toString() === id;
  });

  if (pet instanceof Pet) res.status(200).json(pet);
  else
    res.status(404).json({
      error: `Pet Object with the given id: ${id} is not found`,
    });
};

// 4. Delete a Pet Obj by Id
export const deletePetByID = (
  req: Request<{ id: string }>,
  res: Response<{ error: string } | { success: string }>,
) => {
  let { id } = req.params;
  if (!id.match("pet")) {
    id = "pet-" + id;
  }

  const index = pets.findIndex((pet: Pet) => pet.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: `The Pet Object with id ${id} couldn't be found`,
    });
  }

  pets.splice(index, 1);
  return res.status(200).json({
    success: `The pet with id ${id} has been deleted`,
  });
};

// 5. Update a Pet Obj by Id
export const updatePetByID = (
  req: Request<{ id: string }>,
  res: Response<{ error: string } | { success: string }>,
) => {
  let { id } = req.params;
  if (!id.match("pet")) {
    id = "pet-" + id;
  }
  
  const updatedFields = req.body as Partial<Pet>;
  const index = pets.findIndex((pet: Pet) => pet.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: `The Pet Object with id ${id} couldn't be found`,
    });
  }

  const existingPet: Pet | undefined = pets[index];
  
  if (existingPet === undefined)
    return res.status(404).json({
      error: `The Pet Object with id ${id} couldn't be found`,
    });
    
  if (updatedFields.name !== undefined) 
    existingPet.name = updatedFields.name;
  
  if (updatedFields.species !== undefined)
    existingPet.species = updatedFields.species;
  
  if (updatedFields.breed !== undefined)
    existingPet.breed = updatedFields.breed;
  
  if (updatedFields.adopted !== undefined)
    existingPet.adopted = updatedFields.adopted;
  
  if (updatedFields.age !== undefined) existingPet.age = updatedFields.age;
  
  if (updatedFields.intakeDate !== undefined)
    existingPet.intakeDate = new Date(updatedFields.intakeDate);
  
  if (updatedFields.adoptionDate !== undefined)
    existingPet.adoptionDate =
      updatedFields.adopted === "not-adopted"
        ? "not-adopted"
        : new Date(updatedFields.adoptionDate as string);
  
  if (updatedFields.medicalRecord !== undefined)
    existingPet.medicalRecord = updatedFields.medicalRecord;
  
  if (updatedFields.photo !== undefined)
    existingPet.photo = updatedFields.photo;

  return res.status(200).json({
    success: `The object with id: ${id} has been updated`,
  });
};