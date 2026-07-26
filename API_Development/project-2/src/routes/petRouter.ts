import { Router, type Response, type Request } from "express";

const router = Router();

// Import Pet Class from the Models Folder
import { Pet } from "../models/pets.js";

// 1. Show a single Pet Object
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
    microchipId: null,
  },
  photo: "",
});

router.get("/", (_, res: Response) => {
  res.json({ pet });
});

// 2. Make an entire of array of Pets
import {
  createPet,
  getPetById,
  listPets,
} from "../controllers/petController.js";

router.post(
  "/pets", // Endpoint
  createPet, // Create Pet Obj Controller
);

// API Endpoint to access the entire array of Pets
router.get(
  "/pets",
  listPets, // Get each Pet Obj Controller
);

// 3. Get a specific Pet Object based on its 'id'
router.get(
  "/:id",
  getPetById, // Get a specific Pet by Id controller
);

export default router;