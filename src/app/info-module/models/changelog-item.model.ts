export interface ChangelogItem {
    date: Date,
    type: 'added' | 'updated' | 'changed' | 'fixed' | 'removed',
    title: string,
    description: string,
    githubCommitLink: string,
    trelloTaskLink: string,
}