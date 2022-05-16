/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { movies } = require("../dist/seed-data/data");

module.exports = {
	async up(db, client) {
		console.log(`🌱 Inserting: ${movies.length} Movies`);
		for (const movie of movies) {
			const { insertedId } = await db.collection("movies").insertOne(movie);
			const movieInDb = await db
				.collection("movies")
				.findOne({ _id: insertedId });
			const genreInDb = await db
				.collection("genres")
				.findOne({ name: movieInDb.genre.name });

			await (genreInDb ? db.collection("movies").findOneAndUpdate(
					{ _id: insertedId },
					{
						$set: { genre: { _id: genreInDb._id, name: genreInDb.name } },
					}
				) : db.collection("genres").insertOne(movieInDb.genre));
		}
		console.log(`✅ ${movies.length} Movies Inserted`);
	},

	async down(db, client) {
		await Promise.all([
			await db.collection("movies").deleteMany({}),
			await db.collection("genres").deleteMany({}),
		]);
	},
};
