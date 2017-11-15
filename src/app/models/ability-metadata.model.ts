import { Ability } from './ability.model';

export interface AbilityMetadata {
    is_hidden: boolean;
    slot: number;
    ability: Ability;
}
