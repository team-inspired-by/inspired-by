'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Posts", [{
      title: "Welcome-to-Inspired-by-blog",
      subtitle: "{'KO': 'Inspied-by 블로그에 오신 것을 환영합니다.'}",
      postType: "GENERAL",
      languages: "EN,KO",
      authorId: "63b54c93-635b-42ef-bc83-388debf6fa64",
      keywords: "test",
      summary: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim reiciendis recusandae eaque, facere nesciunt quibusdam suscipit ipsam nisi sequi explicabo ducimus itaque, illo harum cumque repellat inventore aperiam unde incidunt!",
      numViews: 139,
      numLikes: 12,
      numComments: 1,
      publishedAt: Sequelize.fn('NOW'),
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }, {
      title: "This-is-a-seeded-post",
      subtitle: "{'KO': '자동 생성된 포스트입니다.'}",
      postType: "GENERAL",
      languages: "EN,KO",
      authorId: "63b54c93-635b-42ef-bc83-388debf6fa64",
      keywords: "test",
      summary: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim reiciendis recusandae eaque, facere nesciunt quibusdam suscipit ipsam nisi sequi explicabo ducimus itaque, illo harum cumque repellat inventore aperiam unde incidunt!",
      numViews: 234,
      numLikes: 32,
      numComments: 0,
      publishedAt: Sequelize.fn('NOW'),
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Posts", [{
      authorId: "63b54c93-635b-42ef-bc83-388debf6fa64"
    }])
  }
};