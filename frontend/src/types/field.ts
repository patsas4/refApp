import type User from "./user";
import type Game from "./game";
import type Location from "./location";

export default interface Field {
    fieldId: number;       
    fieldName: String;    
    createdByUserId: number;
    createdBy: User;      
    deletedAt: Date | null;
    createdAt: Date;  
    locationId: number | null;
    location: Location | null; 
    games: Game[];
}