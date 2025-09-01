import type Team from "./team";
import type League from "./league";
import type User from "./user";

export default interface TeamInLeague {
    teamInLeagueId: number;   
    teamId: number;
    leagueId: number;
    createdByUserId: number;
    team: Team;     
    league: League;   
    createdBy: User;     
    createdAt: Date; 
    deletedBy: Date | null;
}