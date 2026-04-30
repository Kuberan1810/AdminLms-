/**
 * Capitalizes the first letter of each word in a string.
 */
export const capitalizeWords = (str: string): string => {
    if (!str) return "";
    return str
        .split(" ")
        .map(word => {
            if (!word) return "";
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
};
