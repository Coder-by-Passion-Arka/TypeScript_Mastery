type MedicalRecordProps = {
  vaccinations: string[];
  weightKg: number;
  microchipId: string | null;
};

type adoptionStatus = "adopted" | "not-adopted";

/* Creating a Pet Class with:
    - name (string)
    - species (string)
    - adopted (boolean)
    - age (number)
*/
export class Pet {
  // Making an Unique Private 'id' variable for identifying each Pet Object
  private static nextId = 1;
  private readonly _id: string;

  name: string = "";
  species: string = "";
  breed: string = "";
  adopted: adoptionStatus = "not-adopted";
  age: number = 0;
  intakeDate: Date = new Date();
  adoptionDate: Date | adoptionStatus = new Date();
  medicalRecord: MedicalRecordProps = {
    vaccinations: [""], // Need to place an empty string so that the type of array is infered at runtime. Otherwise, system will mark the array as 'any'
    weightKg: 0,
    microchipId: null,
  };
  photo: string = "";

  // Public Getter method to get the id of a Pet Object
  get id(): string {
    return this._id;
  }

  // Ensure the id is included when this class is serialized to JSON
  // toJSON() is not an Express-only thing.
  // It is a JavaScript protocol that JSON serialization honors.
  // You “manipulate the JSON response printing” by returning the exact shape you want from toJSON().
  toJSON(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      species: this.species,
      breed: this.breed,
      adopted: this.adopted,
      age: this.age,
      intakeDate: this.intakeDate,
      adoptionDate:
        this.adopted == "adopted" 
        ? this.adoptionDate 
        : "not-adopted",
      medicalRecord: this.medicalRecord,
      photo: this.photo,
    };
  }

  // constructor supports either positional args (legacy) or a single object
  constructor(
    nameOrProps:
      | string
      | {
          name: string;
          species?: string;
          breed?: string;
          adopted?: adoptionStatus;
          age?: number;
          intakeDate?: Date | string;
          adoptionDate?: Date | adoptionStatus;
          medicalRecord?: MedicalRecordProps;
          photo?: string;
        }, // this object acts a order-indepedent collection of all the params. JavaScript natively doesn't support order-indepent passing of params
    species?: string,
    breed?: string,
    adopted?: adoptionStatus,
    age: number = 0,
    intakeDate?: Date,
    adoptionDate?: Date | adoptionStatus,
    medicalRecord?: MedicalRecordProps,
    photo?: string,
  ) {
    // Set the id of this new Object
    this._id = `pet-${Pet.nextId++}`; // Static variable need to be referenced using the class name

    // Check if the params have been passed as an Object or not
    if (
      nameOrProps !== null &&
      typeof nameOrProps === "object" &&
      !Array.isArray(nameOrProps)
    ) {
      const props = nameOrProps as any;
      this.name = props.name ?? "";
      this.species = props.species ?? "";
      this.breed = props.breed ?? "";
      this.adopted = props.adopted ?? false;
      this.age = props.age ?? 0;
      this.intakeDate = props.intakeDate
        ? new Date(props.intakeDate)
        : new Date();
      this.adoptionDate =
        this.adopted == "not-adopted"
        ? "not-adopted" 
        : props.adoptionDate instanceof Date
            ? new Date(props.adoptionDate)
            : new Date();
      this.medicalRecord = props.medicalRecord ?? {
        vaccinations: [],
        weightKg: 0,
        microchipId: null,
      };
      this.photo = props.photo ?? "";
    }
    // The params have been passed normally
    else {
      const name = nameOrProps as string;
      this.name = name;
      this.species = species ?? "";
      this.breed = breed ?? "";
      this.adopted = adopted ?? "not-adopted";
      this.age = age;
      this.intakeDate = intakeDate ?? new Date();
      this.adoptionDate =
        this.adopted == "not-adopted"
          ? "not-adopted"
          : this.adoptionDate instanceof Date
            ? this.adoptionDate
            : new Date();;
      this.medicalRecord = medicalRecord ?? {
        vaccinations: [],
        weightKg: 0,
        microchipId: null,
      };
      this.photo = photo ?? "";
    }
  }

  // A Static Method ensures, this function is only availble to the class Pet
  static addPet(data: Pet): Pet {
    const newPet = new Pet({
      name: data.name,
      species: data.species,
      breed: data.breed,
      adopted: data.adopted,
      age: data.age ?? 0,
      intakeDate: data.intakeDate,
      adoptionDate: data.adoptionDate,
      medicalRecord: data.medicalRecord,
      photo: data.photo,
    });

    return newPet;
  }
}

export const pets: Pet[] = []; // A array to store the created Pet Objects