

export function formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function getGameTimeString(date: Date | null): string {
    if (!date) return "";
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const hours = String(date.getHours() % 12 || 12).padStart(2, '0');

    return `${hours}:${minutes} ${ampm}`;
}

export function sortTimeStrings(a: string, b: string): number {
    const [timeA, periodA] = a.split(' ');
    const [hoursA, minutesA] = timeA.split(':').map(Number);
    const [timeB, periodB] = b.split(' ');
    const [hoursB, minutesB] = timeB.split(':').map(Number);
    const totalMinutesA = (periodA === 'PM' && hoursA !== 12 ? hoursA + 12 : (periodA === 'AM' && hoursA === 12 ? 0 : hoursA)) * 60 + minutesA;
    const totalMinutesB = (periodB === 'PM' && hoursB !== 12 ? hoursB + 12 : (periodB === 'AM' && hoursB === 12 ? 0 : hoursB)) * 60 + minutesB;
    return totalMinutesA - totalMinutesB;
}

