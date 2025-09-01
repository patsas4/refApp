import type User from "./user";
import type Field from "./field";

export default interface Location {
    locationId: number;       
    locationName: String;    
    street: String;
    city: String;
    state: String;
    zipcode: String;    
    createdByUserId: number;
    createdBy: User;      
    deletedAt: Date | null;
    createdAt: Date;  
    fields: Field[];
}