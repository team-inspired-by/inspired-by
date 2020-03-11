export default {
    Mutation: {
        createPost: (parent, {
                title,
                category,
                ownerId,
                contents
            }, {
                db
            }, info) =>
            db.Post.update({
                title: title,
                category: category,
                ownerId: ownerId,
                contents: contents
            })
    }
}