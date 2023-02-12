import { IAnimalsRepository } from '../../../domain/repositories/IAnimalsRepository';
import { ICreateAnimal } from '../../../domain/models/ICreateAnimal';
import { v4 as uuidv4 } from 'uuid';
import Animal from '../../../infra/typeorm/entities/Animal';

export class FakeAnimalsRepository implements IAnimalsRepository {
  private animals: Animal[] = [];

  public async create({
    name,
    age,
    sex,
    size,
    other_animals,
    color,
    breed,
    specie,
    user_id,
  }: ICreateAnimal): Promise<Animal> {
    const animal = new Animal();

    animal.id = uuidv4();
    animal.name = name;
    animal.age = age;
    animal.sex = sex;
    animal.size = size;
    animal.other_animals = other_animals;
    animal.color_id = color.id;
    animal.breed_id = breed.id;
    animal.specie_id = specie.id;
    animal.status = 'Criado';
    animal.user_id = user_id;

    this.animals.push(animal);

    return animal;
  }

  public async save(animal: Animal): Promise<Animal> {
    const findIndex = this.animals.findIndex(
      findAnimal => findAnimal.id === animal.id,
    );
    this.animals[findIndex] = animal;

    return animal;
  }

  public async remove(animal: Animal): Promise<void> {
    this.animals.splice(
      this.animals.findIndex(vac => {
        vac.id === animal.id;
      }),
      1,
    );
  }

  public async findAll(user_id: string, isOng: boolean): Promise<Animal[]> {
    if (isOng) {
      const animals = this.animals.filter(animal => animal.user_id === user_id);

      return animals;
    } else {
      return this.animals;
    }
  }

  public async findByName(
    name: string,
    user_id: string,
  ): Promise<Animal | undefined> {
    const animal = this.animals.find(
      animal => animal.name === name && animal.user_id === user_id,
    );
    return animal;
  }

  public async findById(
    id: string,
    user_id: string,
  ): Promise<Animal | undefined> {
    const animal = this.animals.find(
      animal => animal.id === id && animal.user_id === user_id,
    );
    return animal;
  }

  public async findByIdAll(id: string): Promise<Animal | undefined> {
    const animal = this.animals.find(animal => animal.id === id);
    return animal;
  }

  public async findDashboard(
    user_id: string,
    isOng: boolean,
    text: string,
  ): Promise<any> {
    const animal = this.animals.find(animal => animal.user_id === user_id);
    return `${text} - ${animal?.name} - ${isOng}`;
  }

  public async filter(
    name: string,
    sex: string,
    size: string,
    other: string,
  ): Promise<Animal[]> {
    const animals = this.animals.filter(
      animal =>
        animal.name === name &&
        animal.sex === sex &&
        animal.size === size &&
        animal.other_animals === other,
    );

    return animals;
  }
}
