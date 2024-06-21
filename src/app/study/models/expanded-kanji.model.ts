import { Kanji } from "./kanji.model";

export interface ExpandedKanji extends Kanji {
    otherSameKunyomiKanji: string[],
    associatedKanjiDetails: Kanji[],
}