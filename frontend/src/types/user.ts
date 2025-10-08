import type Game from "./game";
import type League from "./league";
import type Team from "./team";
import type TeamInLeague from "./teamInLeague";
import type Field from "./field";
import type AssignerToRef from "./assignerToRef";
import { type Role } from "./role";

export default interface User {
    userId: number;             
    email: String;         
    firstName: String;       
    lastName: String;         
    phone: String;       
    password: String;
    createdAt: Date;       
    createdBy: String;         
    deletedAt: Date | null;
    deletedBy: String | null;        
    leagues: League[];
    teams: Team[];
    teamInLeagues: TeamInLeague[];
    createdGames: Game[];          
    locations: Location[];
    fields: Field[];
    centerGames: Game[];          
    ar1Games: Game[];         
    ar2rGames: Game[];         
    assignerOf: AssignerToRef[]; 
    refTo: AssignerToRef[]; 
    roles: Role[];
}

export function getFullName(user: User | null | undefined): string {
  return user ? `${user.firstName} ${user.lastName}` : "";
}