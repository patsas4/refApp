import { useEffect, useState } from "react";
import type Game from "../types/game";
import type Team from "../types/team";
import type Field from "../types/field";
import type League from "../types/league";
import type User from "../types/user";
import { getFullName } from "../types/user";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatDateForInput, getGameTimeString } from "../scripts/date";
import { getGameDate } from "../types/game";

const CreateGame = () => {
    const navigate = useNavigate();

    const [refs, setRefs] = useState<User[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [fields, setFields] = useState<Field[]>([]);
    const [leagues, setLeagues] = useState<League[]>([]);
    const [gameDate, setGameDate] = useState<Date>(new Date());

    const [game, setGame] = useState<Partial<Game>>({
        homeTeamId: null,
        awayTeamId: null,
        leagueId: null, 
        createdAt: new Date(),
        date: null,
        fieldId: null,
        centerRefUserId: null,
        ar1UserId: null,
        ar2UserId: null,
    });

    const getRefs = async () => {
        try {
            const res = await axios.get("/api/user/ref");
            setRefs(res.data);
        }
        catch (err) {
        }
    };

    const getTeams = async () => {
        try {
            const res = await axios.get("/api/user/team");
            setTeams(res.data);
        }
        catch (err) {
        }
    };

    const getFields = async () => {
        try {
            const res = await axios.get("/api/user/field");
            setFields(res.data);
        }
        catch (err) {
        }
    };

    const getLeagues = async () => {
        try {
            const res = await axios.get("/api/user/league");
            setLeagues(res.data);
        }
        catch (err) {
        }
    };

    useEffect(() => {
        getRefs();
    }, []);

    useEffect(() => {
        getTeams();
    }, []);

    useEffect(() => {
        getFields();
    }, []);

    useEffect(() => {
        getLeagues();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "date") {
            const date = new Date(value);
            setGameDate(date);
            setGame(prev => ({
                ...prev,
                date: getGameDate(date),
                time: getGameTimeString(date)
            }));
            return;
        }
        setGame(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/game", game);
            navigate("/dashboard");
        }
        catch (err) {
            
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <select name="homeTeamId" onChange={handleChange}>
                    <option value="">Select Home Team</option>
                    {teams.map(team => <option key={team.teamId} value={team.teamId}>{team.teamName}</option>)}
                </select>
            </div>
            <div>
                <select name="awayTeamId" onChange={handleChange}>
                    <option value="">Select Away Team</option>
                    {teams.map(team => <option key={team.teamId} value={team.teamId}>{team.teamName}</option>)}
                </select>
            </div>
            <div>
                <select name="leagueId" onChange={handleChange}>
                    <option value="">Select League</option>
                    {leagues.map(league => <option key={league.leagueId} value={league.leagueId}>{league.leagueName}</option>)}
                </select>
            </div>
            <div>
                <input type="datetime-local" name="date" value={game.date ? formatDateForInput(gameDate) : ""} onChange={handleChange} />
            </div>
            <div>
                <select name="fieldId" onChange={handleChange}>
                    <option value="">Select Field</option>
                    {fields.map(field => <option key={field.fieldId} value={field.fieldId}>{field.fieldName}</option>)}
                </select>
            </div>
            <div>
                <select name="centerRefUserId" onChange={handleChange}>
                    <option value="">Select Center Referee</option>
                    {refs.map(ref => <option key={ref.userId} value={ref.userId}>{getFullName(ref)}</option>)}
                </select>
            </div>
            <div>
                <select name="ar1UserId" onChange={handleChange}>
                    <option value="">Select AR1</option>
                    {refs.map(ref => <option key={ref.userId} value={ref.userId}>{getFullName(ref)}</option>)}
                </select>
            </div>
            <div>
                <select name="ar2UserId" onChange={handleChange}>
                    <option value="">Select AR2</option>
                    {refs.map(ref => <option key={ref.userId} value={ref.userId}>{getFullName(ref)}</option>)}
                </select>
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default CreateGame;