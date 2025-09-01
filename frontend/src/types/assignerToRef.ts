import type User from "./user";

export default interface AssignerToRef {
    assignerToRefId: number; 
    assignerId: number;
    refId: number;
    assigner: User;
    ref: User;
}