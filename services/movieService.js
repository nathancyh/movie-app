module.exports = class MovieService {
    constructor(knex) {
        this.knex = knex;
    }

    list(movieid) {
        return this.knex
            .select("reviews.user_id",
                "reviews.movie_id",
                "reviews.rating",
                "reviews.review_title",
                "reviews.text",
                "users.name"
            )
            .from("reviews")
            .innerJoin("movies", "reviews.movie_id", "movies.api_id")
            .innerJoin("users", "reviews.user_id", "users.id")
            .where("movies.api_id", movieid)
            .orderBy("reviews.created_at")
            .then((data) => {
                // console.log("list data",data);
                return data;
            })
    }

    add(movieid, userid, text) {
        if (userid) {
            return this.knex("reviews")
                .insert([{ user_id: userid, movie_id: movieid, text: text }])
        } else {
            throw new Error("Cannot add note from non-existent user");
        }
    }

//     // update(reviewid, text) {
//     //     return this.knex("reviews")
//     //         .where({ id: reviewid })
//     //         .update({ text: text })
//     // }
}