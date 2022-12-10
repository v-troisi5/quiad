# Server REST API

## Comandi utili

Di seguito sono riportati una serie di comandi utili da utilizzare per aggiornare il sottosistema.

### Migrazione delle modifiche da prisma al Datasource

Una volta apportate delle modifiche allo schema Prisma, è possibile generare una nuova migrazione lanciando il seguente comando:

```
npx prisma migrate dev --name *migration name*
```

### Sincronizzazione delle migrazioni con il database

Se il database non è sincronizzato con le migrazioni, eseguire i seguenti comandi riporterà tutte le migrazioni al database specificato e lo popolerà con le istanze specificate nello script di *seed* (vedi il file <code>/prisma/seed.ts</code>).

```
npx prisma db push
npx prisma db seed
```

Lo script di seed, può essere modificato nel file package.json, sotto l'attributo <code>prisma</code>.

```json
"prisma": {
    "seed": "npx ts-node prisma/seed.ts"
}
```