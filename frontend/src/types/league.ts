import type User from "./user";
import type TeamInLeague from "./teamInLeague";

export default interface League {
    leagueId: number;           
    leagueName: String;        
    createdByUserId: number;
    createdBy: User;          
    createdAt: Date;      
    deletedAt: Date | null;
    teamInLeagues: TeamInLeague[];
}