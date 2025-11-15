import type User from "./user";
import type Team from "./team";
import type Field from "./field";
import { sortTimeStrings } from "../scripts/date";

export default interface Game {
  gameId: number | null;
  homeTeamId: number | null;
  awayTeamId: number | null;
  leagueId: number | null;
  createdAt: Date; 
  createdByUserId: number | null;
  createdBy?: User | null;     
  date: string | null;
  time: string | null;
  deletedAt?: Date | null;
  homeTeam?: Team | null;    
  awayTeam?: Team | null;    
  fieldId: number | null;
  field?: Field | null;  
  centerRefUserId: number | null;
  centerRef?: User | null;    
  ar1UserId: number | null;
  ar2UserId: number | null;
  ar1?: User | null;    
  ar2?: User | null;
}

export function getGameDate(date: Date): string {
  if (!date) return "";
  return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
}

export function sortGamesByTime(a: Game, b: Game): number {
  return sortTimeStrings(a.time || "", b.time || "");
}

export function sortGamesByDate(a: Game, b: Game): number {
  if (!a.date || !b.date) return 0;
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateA.getTime() - dateB.getTime();
}