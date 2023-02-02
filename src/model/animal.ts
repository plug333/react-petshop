export interface IAnimalResponse {
    limit: number;
    skip: 0;
    total: number;
    animals: IAnimal[];
  }

export interface IAnimal {
    _id: string;
    name: string;
    type: 'DOG' | 'CAT';
    breed: string;
    birthDate: string;
    created_at: string;
    updated_at: string;
}