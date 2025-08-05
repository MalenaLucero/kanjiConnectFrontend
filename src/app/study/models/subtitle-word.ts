interface Subtitle {
    startTime: string;
    endTime: string;
    line: string;
}

interface Episode {
    _id: string;
    japaneseTitle: string | null;
    englishTitle: string | null;
    anime: string;
    number: number;
    season: number;
    summary: string | null;
    subtitles: Subtitle[]
}

interface EpisodesByAnime {
    anime: string;
    episodes: Episode[]
}

export interface WordInSubtitles {
    word: string;
    numberOfEpisodes: number;
    numberOfInstances: number;
    episodesGroupedByAnime: EpisodesByAnime[]
}