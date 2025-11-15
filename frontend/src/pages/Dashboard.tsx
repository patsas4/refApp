import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type Game from "../types/game";
import GameBlock from "../components/GameBlock";
import styles from "../styles/Dashboard.module.css";
import { sortGamesByDate } from "../types/game";

const Dashboard = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [groupedGames, setGroupedGames] = useState<Record<string, Game[]>>({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            const res = await axios.get("/api/game");
            const fetchedGames: Game[] = res.data;

            setGames(fetchedGames);

            const grouped = fetchedGames
                .sort((a, b) => sortGamesByDate(b, a))
                    .reduce((acc: Record<string, Game[]>, game) => {
                        const dateKey: string = game.date!; 
                        if (!acc[dateKey]) acc[dateKey] = [];
                        acc[dateKey].push(game);
                        return acc;
            }, {});
            
            setGroupedGames(grouped);
        } catch (err) {
            console.error(err); 
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <button onClick={() => navigate("/create-game")}>Create New Game</button>
                <h2>Games</h2>

                {Object.entries(groupedGames).map(([date, games]) => (
                    <div key={date}>
                        <h3>{date}</h3>
                        <GameBlock games={games} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
