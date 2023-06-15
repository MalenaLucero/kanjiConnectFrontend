import { ChangelogItem } from "../../models/changelog-item.model";

export const changelogData: ChangelogItem[] = [
    {
        date: new Date('06/15/2023'),
        type: 'changed',
        title: 'Frontend header refactor',
        description: 'Small refactor of the application header. Router links for About and Changelog sections were created.',
        githubCommitLink: 'https://github.com/MalenaLucero/kanjiConnectFrontend/commit/7954502850c99718026fa32657e4e93723df108c',
        trelloTaskLink: 'https://trello.com/c/xuI3zmoL/11-header-refactor',
    }, {
        date: new Date('06/15/2023'),
        type: 'updated',
        title: 'Frontend updated to Angular 15',
        description: 'Update from Angular 14 to Angular 15, including Angular Material.',
        githubCommitLink: 'https://github.com/MalenaLucero/kanjiConnectFrontend/commit/e198aaf1b5be891b90577054018df23027ee1e00',
        trelloTaskLink: 'https://trello.com/c/JOLJTduU/10-angular-15-and-angular-material-update',
    }
]