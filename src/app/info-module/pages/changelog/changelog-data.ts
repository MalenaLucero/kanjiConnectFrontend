import { ChangelogItem } from "../../models/changelog-item.model";

export const changelogData: ChangelogItem[] = [
    {
        date: new Date('09/25/2023'),
        type: 'added',
        title: 'Notes on expressions and kanji',
        description: 'Notes can now be added to expressions through the update field. Kanji are stored with an empty string on notes. Later the application will offer the possibility of updating those notes',
        githubCommitLink: 'https://github.com/MalenaLucero/kanjiConnectFrontend/commit/909a82dc7c8368bf9eecbb0d82d38fd6e74134ad',
        trelloTaskLink: 'https://trello.com/c/XFK1UAM4/27-expression-and-user-kanji-add-notes-property',
    },
    {
        date: new Date('09/24/2023'),
        type: 'added',
        title: 'Filter expressions by reading',
        description: 'Now expressions can also be found by their reading',
        githubCommitLink: 'https://github.com/MalenaLucero/kanjiConnectFrontend/commit/ec000867b27c98d323d72a86b86b2dd24ee0a00a',
        trelloTaskLink: 'https://trello.com/c/4U8tZOx1/26-filter-expressions-by-reading',
    },
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