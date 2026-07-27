import { Router, type Response, type Request } from "express";
import {
  createPet,
  deletePetByID,
  getPetById,
  listPets,
  updatePetByID,
} from "../controllers/petController.js";

const router = Router();

// // Import Pet Class from the Models Folder
// import { Pet } from "../models/petSchema.js";

// const pet: Pet = new Pet({
//   name: "Bob",
//   species: "Dog",
//   breed: "Dalmatian",
//   adopted: "adopted",
//   age: 3,
//   intakeDate: new Date("2022-10-09"),
//   adoptionDate: new Date("2026-08-01"),
//   medicalRecord: {
//     vaccinations: ["Rabies", "Fleas"],
//     weightKg: 50,
//     microchipId: null,
//   },
//   photo: "",
// });

// // 1. Create the single pet object
// router.post(
//   "/pets", // Endpoint
//   createPet, // Create Pet Obj Controller
// );

// router.get("/", (_, res: Response) => {
//   res.json({ pet });
// });

// 2. Make an entire of array of Pets
// create an array of Pet   objects
router.post(
  "/pets", // Endpoint
  createPet, // Create Pet Obj Controller
);

// 3. API Endpoint to access the entire array of Pets
router.get(
  "/pets",
  listPets, // Get each Pet Obj Controller
);

// 4. Get a specific pet by id
router.get(
    "/pets/:id", 
    getPetById
);

// 5. Update a pet by id
router.patch(
    "/pets/:id", 
    updatePetByID
);

// 6. Delete a pet by id
router.delete(
    "/pets/:id", 
    deletePetByID
);

export default router;