<p align="center">
  <img src="./readme_assets/logo.png" alt="Logo" height="150">
</p>
<h1 align="center">Neo Wallet</h1>
<p align="center">Banking without borders</p>

## Prerequisites

- Node.js >= v12.19.0
- Yarn >= v1.22.10
- Docker >= v20.10.7

## Install

```bash
$ yarn
```

## Usage

### Starting database

```bash
$ yarn dev:db
```

### Running migrations

```bash
$ yarn typeorm migration:run
```

### Running application

```bash
$ yarn dev
```

## Technologies

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [TypeScript](https://typescriptlang.org)
- [PostgreSQL](https://postgresql.org)
- [TypeORM](https://typeorm.io)

## Standardization

- [ts-standard](https://npmjs.com/package/ts-standard)
- [husky](https://npmjs.com/package/husky)
- [lint-staged](https://npmjs.com/package/lint-staged)
- [git-commit-msg-linter](https://npmjs.com/package/git-commit-msg-linter)
- [Conventional Commits](https://conventionalcommits.org)
