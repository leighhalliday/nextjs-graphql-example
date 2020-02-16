import { ApolloServer, gql } from "apollo-server-micro";
import DataLoader from "dataloader";
import knex from "knex";

const db = knex({
  client: "pg",
  debug: true,
  connection: process.env.PG_CONNECTION_STRING
});

const typeDefs = gql`
  type Query {
    albums(first: Int = 25, skip: Int = 0): [Album!]!
  }

  type Artist {
    id: ID!
    name: String!
    url: String!
    albums(first: Int = 25, skip: Int = 0): [Album!]!
  }

  type Album {
    id: ID!
    name: String!
    year: String!
    artist: Artist!
  }
`;

const resolvers = {
  Query: {
    albums: (_parent, args, _context) => {
      return db
        .select("*")
        .from("albums")
        .orderBy("year", "asc")
        .limit(Math.min(args.first, 50))
        .offset(args.skip);
    }
  },

  Album: {
    id: (album, _args, _context) => album.id,
    artist: (album, _args, { loader }) => {
      // return db
      //   .select("*")
      //   .from("artists")
      //   .where({ id: album.artist_id })
      //   .first();
      return loader.single.load("artists", album.artist_id);
    }
  },

  Artist: {
    id: (artist, _args, _context) => artist.id,
    albums: (artist, args, { loader }) => {
      return db
        .select("*")
        .from("albums")
        .where({ artist_id: artist.id })
        .orderBy("year", "asc")
        .limit(Math.min(args.first, 50))
        .offset(args.skip);
    }
  }
};

export const config = {
  api: {
    bodyParser: false
  }
};

class Single {
  loaders = {};

  load(table, id) {
    const loader = this.findLoader(table);
    return loader.load(id);
  }

  findLoader(table) {
    if (!this.loaders[table]) {
      this.loaders[table] = new DataLoader(async ids => {
        const rows = await db
          .select("*")
          .from(table)
          .whereIn("id", ids);

        const lookup = rows.reduce((acc, row) => {
          acc[row.id] = row;
          return acc;
        }, {});

        return ids.map(id => lookup[id] || null);
      });
    }
    return this.loaders[table];
  }
}

export default (req, res) => {
  const loader = {
    single: new Single()
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
      return { loader };
    }
  });

  const handler = apolloServer.createHandler({ path: "/api/graphql" });

  return handler(req, res);
};
