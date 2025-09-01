import type User from "./user";
import type Game from "./game";
import type TeamInLeague from "./teamInLeague";

export default interface Team {
    teamId: number;
    teamName: String;
    createdAt: Date;
    createdByUserId: number;
    createdBy: User;
    teamInLeagues: TeamInLeague[];
    homeGames: Game[];         
    awayGames: Game[];
}