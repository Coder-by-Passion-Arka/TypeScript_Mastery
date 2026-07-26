import express from "express";
import type { Express, Request, Response } from "express";
import cors from "cors";

const app: Express = express();

app.use(express.json());

app.use(cors());

// Import Pet Class from the Models Folder
import { Pet } from "./models/pets.js";

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

app.get("/", (_, res: Response) => {
  res.json({ pet });
});

// 2. Make an entire of array of Pets
import { createPet, getPetById, listPets } from "./controllers/petController.js";

app.post(
  "/pets", // Endpoint
   createPet, // Create Pet Obj Controller
);

// API Endpoint to access the entire array of Pets
app.get(
    "/pets", 
    listPets // Get each Pet Obj Controller
);

// 3. Get a specific Pet Object based on its 'id'
app.get(
  "/:id",
  getPetById // Get a specific Pet by Id controller 
);

const PORT = 8000;
app.listen(PORT, (): void => {
  console.log(`Listening on PORT: ${PORT}`);
});
