import type Game from "../types/game";
import { getFullName } from "../types/user";
import styles from "../styles/GameBlock.module.css"
import { sortGamesByDate } from "../types/game";

const GameBlock = ({ games }: { games: Game[] }) => (
    <div className={styles.container}>
        <table className={styles.gameTable} style={{ border: "1px solid #ccc", margin: "1em 0", padding: "1em" }}>
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Field</th>
                    <th>Center Ref</th>
                    <th>AR1</th>
                    <th>AR2</th>
                    <th>Home</th>
                    <th>Away</th>
                </tr>
            </thead>
            <tbody>
                {games.sort(sortGamesByDate).map(game => (
                    <tr key={game.gameId}>
                        <td>{game.time || ""}</td>
                        <td>{game.field?.fieldName || ""}</td>
                        <td>{getFullName(game.centerRef)}</td>
                        <td>{getFullName(game.ar1)}</td>
                        <td>{getFullName(game.ar2)}</td>
                        <td>{game.homeTeam?.teamName}</td>
                        <td>{game.awayTeam?.teamName}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default GameBlock;