module.exports = class ProfileService {
    constructor(knex) {
        this.knex = knex;
    }

    add(userid, movie, genre, intro) {
        console.log("profile service adding")
        return this.knex("users")
            .where("id", userid)
            .update({ fav_movie: movie, fav_genre: genre, intro: intro })

    }

    // update(userid, movie, genre, intro) {
    //     return this.knex("users")
    //         .where("id", userid)
    //         .update({ fav_movie: movie, fav_genre: genre, intro: intro })
    // }

}