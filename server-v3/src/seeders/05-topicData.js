'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [];
    const topics = ["English", "Philosophy", "ROS", "Indonesian", "OpenCV", "Memory"];
    const description = [
      "",
      "“Is man merely a mistake of God's? Or God merely a mistake of man's?” – Friedrich Nietzsche",
      "", "", "",
      "Image processing with the representative framework, OpenCV"
    ]
    const coverImageId = [
      "1a5139d8-4733-4308-a2b3-f7de7be0a444",
      "1a5139d8-4733-4308-a2b3-f7de7be0a444",
      "1a5139d8-4733-4308-a2b3-f7de7be0a444",
      "e0180067-bca0-4a69-a689-abd262bc2721",
      "e0180067-bca0-4a69-a689-abd262bc2721",
      "e0180067-bca0-4a69-a689-abd262bc2721"
    ]
    const date = Sequelize.fn("NOW");
    for (let i in topics) {
      data.push({
        name: topics[i],
        coverImageId: coverImageId[i],
        coverDescription: description[i],
        createdAt: date,
        updatedAt: date
      })
    }
    return queryInterface.bulkInsert("Topics", data)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Topics", [{
      name: "English"
    }, {
      name: "Philosophy",
    }, {
      name: "ROS",
    }, {
      name: "Indonesian",
    }, {
      name: "OpenCV",
    }, {
      name: "Memory",
    }])
  }
};