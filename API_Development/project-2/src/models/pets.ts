type MedicalRecordProps = {
  vaccinations: string[];
  weightKg: number;
  microchipId: string | null;
};

/* Creating a Pet Class with:
    - name (string)
    - species (string)
    - adopted (boolean)
    - age (number)
*/
class Pet {
  name: string = "";
  species: string = "";
  breed: string = "";
  adopted: boolean = false;
  age: number = 0;
  intakeDate: Date = new Date();
  adoptionDate: Date = new Date();
  medicalRecord: MedicalRecordProps = {
    vaccinations: [""], // Need to place an empty string so that the type of array is infered at runtime. Otherwise, system will mark the array as 'any'
    weightKg: 0,
    microchipId: null,
  };
  photo: string = "";

  // constructor supports either positional args (legacy) or a single object
  constructor(
    nameOrProps: string | {
        name: string;
        species?: string;
        breed?: string;
        adopted?: boolean;
        age?: number;
        intakeDate?: Date | string;
        adoptionDate?: Date | string;
        medicalRecord?: MedicalRecordProps;
        photo?: string;
    }, // this object acts a order-indepedent collection of all the params. JavaScript natively doesn't support order-indepent passing of params 
    species?: string,
    breed?: string,
    adopted?: boolean,
    age: number = 0,
    intakeDate?: Date,
    adoptionDate?: Date,
    medicalRecord?: MedicalRecordProps,
    photo?: string,
  ) {
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
      this.adoptionDate = props.adoptionDate
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
      this.adopted = adopted ?? false;
      this.age = age;
      this.intakeDate = intakeDate ?? new Date();
      this.adoptionDate = adoptionDate ?? new Date();
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

export default Pet;