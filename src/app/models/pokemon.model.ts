import { AbilityMetadata } from './ability-metadata.model';
export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: AbilityMetadata[];
}
