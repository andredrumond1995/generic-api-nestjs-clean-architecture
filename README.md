# NodeJS API

Template API - NestJs Clean Architecture
### Structure


```
src
   application/
   domain/
   infrastructure/
   presentation/
```

### Running

```
- Run without docker

1 - yarn
2 - yarn run typeorm migration:run
3 - yarn start:dev

```

### Documentation (available when application is running)


```
http://localhost:3000/api/v1/doc/
```

### Typeorm migrations

```
1 - yarn run typeorm migration:run (it will execute sql instructions in migrations/ - up function)
2 - yarn run typeorm migration:revert (it will execute sql instructions in migrations/ - down function)
3 - yarn run typeorm migration:generate -n all-tables (it will create a migration file of all data tables in accordance to the entities in src/infrastructure/databases/entities)
4 - yarn run typeorm migration:create -n user-create-sqlite (it will create a file in migrations/ folder with up and down function)
5 - yarn run typeorm schema:sync (entities will be sync with the database)
6 - yarn run typeorm schema:drop (drop all tables)

```



## Authors

- **André Drumond das Chagas** - [Linkedin](https://www.linkedin.com/in/andre-drumond/)

## License

This project is licensed under the MIT License - see the [license](license) file for details