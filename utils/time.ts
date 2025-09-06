
// --- TIME HELPER CONSTANTS & FUNCTIONS ---

export const MOCK_CURRENT_DATE = new Date('2025-09-06T14:30:00Z');

export const getFormattedTimestamp = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

export const getRelativeTimestamp = (offset: { days?: number, hours?: number, minutes?: number, seconds?: number }): string => {
    const now = new Date(MOCK_CURRENT_DATE);
    if (offset.days) now.setDate(now.getDate() + offset.days);
    if (offset.hours) now.setHours(now.getHours() + offset.hours);
    if (offset.minutes) now.setMinutes(now.getMinutes() + offset.minutes);
    if (offset.seconds) now.setSeconds(now.getSeconds() + offset.seconds);
    return getFormattedTimestamp(now);
};

export const getRelativeDate = (offset: { days?: number, months?: number, years?: number }): string => {
    const now = new Date(MOCK_CURRENT_DATE);
    if (offset.years) now.setFullYear(now.getFullYear() + offset.years);
    if (offset.months) now.setMonth(now.getMonth() + offset.months);
    if (offset.days) now.setDate(now.getDate() + offset.days);
    return formatDate(now);
};