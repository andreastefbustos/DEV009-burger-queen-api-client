export function getCurrentDateTime() {
    const now = new Date();

    // "2022-03-05T15:14:10.123Z" -> Separar en fecha y hora
    const [datePart, timePart] = now.toISOString().split('T');

    // Tomar solo las horas, minutos y segundos de la parte del tiempo
    const time = timePart.slice(0, 8);

    return `${datePart} ${time}`;
}