import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type Game from "../types/game";
import { getFullName } from "../types/user";

const Dashboard = () => {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    const fetchGames = async () => {
        try {
            const res = await axios.get("/api/game");
            setGames(res.data);
        } catch (err) {
            alert("Failed to fetch games");
        }
    };

    function GameBlock({ game }: { game: Game }) {
        return (
            <div className="game-block">
                <h3>Game ID: {game.gameId}</h3>
                <p>Date: {new Date(game.date).toDateString()}</p>
                <p>Teams: {game.homeTeam?.teamName} vs {game.awayTeam?.teamName}</p>
                <p>Field: {game.field?.fieldName}</p>
                <p>Center Ref: {getFullName(game.centerRef!)}</p>
                <p>AR1: {getFullName(game.ar1!)}</p>
                <p>AR2: {getFullName(game.ar2!)}</p>
            </div>
        );
    }
};

export default Dashboard;