# Next.js GraphQL Example

Querying:

```graphql
{
  albums {
    id
    name
    artist {
      id
      name
    }
  }
}
```

Results:

```json
{
  "data": {
    "albums": [
      {
        "id": "1",
        "name": "Turn It Around",
        "artist": {
          "id": "1",
          "name": "Comeback Kid"
        }
      },
      {
        "id": "2",
        "name": "Wake the Dead",
        "artist": {
          "id": "1",
          "name": "Comeback Kid"
        }
      },
      {
        "id": "3",
        "name": "Broadcasting...",
        "artist": {
          "id": "1",
          "name": "Comeback Kid"
        }
      },
      {
        "id": "4",
        "name": "Symptoms + Cures",
        "artist": {
          "id": "1",
          "name": "Comeback Kid"
        }
      },
      {
        "id": "5",
        "name": "Die Knowing",
        "artist": {
          "id": "1",
          "name": "Comeback Kid"
        }
      },
      {
        "id": "6",
        "name": "Outsider",
        "artist": {
          "id": "1",
          "name": "Comeback Kid"
        }
      }
    ]
  }
}
```
