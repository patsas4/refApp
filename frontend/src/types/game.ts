import type User from "./user";
import type Team from "./team";
import type Field from "./field";

export default interface Game {
  gameId: number | null;
  homeTeamId: number | null;
  awayTeamId: number | null;
  leagueId: number | null;
  createdAt: Date; 
  createdByUserId: number;
  createdBy: User;     
  date: Date;
  deletedAt: Date;
  homeTeam: Team | null;    
  awayTeam: Team | null;    
  fieldId: number | null;
  field: Field | null;  
  centerRefUserId: number | null;
  centerRef: User | null;    
  ar1UserId: number | null;
  ar2UserId: number | null;
  ar1: User | null;    
  ar2: User | null;
}