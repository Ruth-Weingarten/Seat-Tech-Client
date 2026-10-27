export const initials = (fullName: string): string =>
    fullName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join("")

export const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })