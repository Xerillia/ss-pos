const lookup: Record<string, string> = {
    A: "1",
    B: "2",
    C: "3",
    D: "4",
    E: "5",
    P: "6",
    G: "7",
    R: "8",
    S: "9",
    K: "1",
    L: "2",
    M: "3",
    O: "5",
    T: "0",
    U: "00",
    V: "000",
    W: "0000",
};

export const INVALID_LETTERS_REGEX = /[^[ABCDEPGRSKLMOTUVWZ]/giu;

const extractBody = (regex: RegExp) => {
    const match = regex.source.match(/\[\^(.*)\]/);
    return match ? match[1] : "";
};

export const INVALID_LETTERS_EXCLUDE_NUMBER_REGEX = new RegExp(
    `[^${extractBody(INVALID_LETTERS_REGEX)}0-9]`,
    "giu",
);

export function convertLetterToNumber(value: string): string {
    const chars = [...value.toUpperCase()];
    const result = chars
        .map((char, index) => {
            let targetChar = char;

            // If the current character is Z, look backwards until we find a non-Z character
            let lookupIndex = index;
            while (targetChar === "Z" && lookupIndex > 0) {
                lookupIndex--;
                targetChar = chars[lookupIndex];
            }

            // Convert the final resolved character using the lookup, or keep it if missing
            return lookup[targetChar] ?? targetChar;
        })
        .join("");
    return result;
}

// Build the reverse lookup map dynamically
// Maps a number string (e.g., "1") to an array of characters (e.g., ["A", "K"])
const reverseLookup: Record<string, string[]> = {};

for (const [letter, numberStr] of Object.entries(lookup)) {
    if (!reverseLookup[numberStr]) {
        reverseLookup[numberStr] = [];
    }
    reverseLookup[numberStr].push(letter);
}

// Helper to pick a random element from an array
function getRandomElement<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

export function convertNumberToLetter(value: string): string {
    let remaining = value;
    const resultLetters: string[] = [];

    // Track the first occurrence for each priority number
    // The first occurrence of 1, 2, or 3
    const usedPriority = {
        "1": false,
        "2": false,
        "3": false,
    };

    const priorityLetterMap: Record<string, string> = {
        "1": "K",
        "2": "L",
        "3": "M",
    };

    // Regular non-zero tokens sorted by length descending
    const nonZeroTokens = Object.keys(reverseLookup)
        .filter((token) => !/^0+$/.test(token))
        .sort((a, b) => b.length - a.length);

    // Track the last resolved letter to handle "Z" substitutions
    let lastLetter = "";

    while (remaining.length > 0) {
        // 1. Specialized handling for consecutive zero sequences
        if (remaining.startsWith("0")) {
            // Count total continuous zeros ahead
            let zeroCount = 0;
            while (
                zeroCount < remaining.length &&
                remaining[zeroCount] === "0"
            ) {
                zeroCount++;
            }

            let tokenToMatch = "";

            // Calculate the remainder over our maximum block size (4 for "0000")
            const remainder = zeroCount % 4;

            if (remainder > 0 && zeroCount > 4) {
                // If there is an uneven remainder,
                // peel off the remainder token first to leave a perfect multiple of 4.
                if (remainder === 1) tokenToMatch = "0"; // 5 zeros -> "0" first (leaving 4) -> TW
                if (remainder === 2) tokenToMatch = "00"; // 6 zeros -> "00" first (leaving 4) -> UW
                if (remainder === 3) tokenToMatch = "000"; // 7 zeros -> "000" first (leaving 4) -> VW
            } else {
                // Standard greedy matching for blocks of 4 or fewer zeros
                if (zeroCount >= 4)
                    tokenToMatch = "0000"; // W
                else if (zeroCount === 3)
                    tokenToMatch = "000"; // V
                else if (zeroCount === 2)
                    tokenToMatch = "00"; // U
                else tokenToMatch = "0"; // T
            }

            const chosenLetter = getRandomElement(reverseLookup[tokenToMatch]);
            if (chosenLetter === lastLetter) {
                resultLetters.push("Z");
            } else {
                resultLetters.push(chosenLetter);
                lastLetter = chosenLetter;
            }

            remaining = remaining.slice(tokenToMatch.length);
            continue;
        }

        // 2. Standard greedy evaluation for non-zero tokens
        let matched = false;
        for (const token of nonZeroTokens) {
            if (remaining.startsWith(token)) {
                let chosenLetter = "";

                // Prioritize K, L, M for the FIRST occurrence of "1", "2", or "3"
                if (
                    (token === "1" || token === "2" || token === "3") &&
                    !usedPriority[token]
                ) {
                    usedPriority[token] = true;
                    chosenLetter = priorityLetterMap[token];
                } else {
                    chosenLetter = getRandomElement(reverseLookup[token] ?? []);
                }

                if (chosenLetter === lastLetter) {
                    resultLetters.push("Z");
                } else {
                    resultLetters.push(chosenLetter);
                    lastLetter = chosenLetter;
                }

                remaining = remaining.slice(token.length);
                matched = true;
                break;
            }
        }

        // Fallback for unmapped individual characters
        if (!matched) {
            resultLetters.push(remaining[0]);
            lastLetter = "";
            remaining = remaining.slice(1);
        }
    }

    return resultLetters.join("");
}
