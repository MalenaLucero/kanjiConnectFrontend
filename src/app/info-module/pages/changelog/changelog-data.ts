import { ChangelogItem } from "../../models/changelog-item.model";

export const changelogData: ChangelogItem[] = [
    {
        date: new Date('08/12/2023'),
        type: 'added',
        title: 'Difficulty filter added',
        description: 'Difficulty filter added for Expressions and Kanji on Manage and Review',
        githubCommitLink: 'https://github.com/MalenaLucero/kanjiConnectFrontend/commit/b537e13dede15894a58f39179c5e184dc5f29fe6',
        trelloTaskLink: 'https://trello.com/c/79aJQE0s/16-add-dificulty-to-manage-filter',
    },
    {
        date: new Date('06/15/2023'),
        type: 'added',
        title: 'Info module created for About and Changelog sections',
        description: 'Info module created. About and Changelog routes and components added.',
        githubCommitLink: 'https://github.com/MalenaLucero/kanjiConnectFrontend/commit/2c244164ae0bc8a8204046d3b4496abdc4908d60',
        trelloTaskLink: 'https://trello.com/c/r3FZtKrh/5-create-changelog-and-about-section-fe-info-module',
    }, {
        date: new Date('06/14/2023'),
        type: 'changed',
        title: 'Frontend header refactor',
        description: 'Small refactor of the application header. Router links for About and Changelog sections were created.',
        githubCommitLink: 'https://github.com/MalenaLucero/kanjiConnectFrontend/commit/7954502850c99718026fa32657e4e93723df108c',
        trelloTaskLink: 'https://trello.com/c/xuI3zmoL/11-header-refactor',
    }, {
        date: new Date('06/14/2023'),
        type: 'updated',
        title: 'Frontend updated to Angular 15',
        description: 'Update from Angular 14 to Angular 15, including Angular Material.',
        githubCommitLink: 'https://github.com/MalenaLucero/kanjiConnectFrontend/commit/e198aaf1b5be891b90577054018df23027ee1e00',
        trelloTaskLink: 'https://trello.com/c/JOLJTduU/10-angular-15-and-angular-material-update',
    }
]