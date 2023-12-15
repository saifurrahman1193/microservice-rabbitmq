export const toTitleCase = (str: string) => {
    return str.replace(/\b\w/g, function (match: string) {
        return match.toUpperCase();
    });
}