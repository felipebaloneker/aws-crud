"use strict";
const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();
const uuid = require("uuid/v4");

const postsTable = process.env.POSTS_TABLE;

function response(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message),
  };
}

module.exporst.createPost = (event, context, callback) => {
  const reqBody = JSON.parse(evet.doby);

  const post = {
    id: uuid(),
    createdAt: new Date().toISOString(),
    userId: 1,
    title: reqBody.title,
    body: reqBody.body,
  };

  return db
    .put({
      TableName: postsTable,
      Item: post,
    })
    .promise()
    .then(() => {
      callback(null, response(201, post));
    })
    .catch((err) => response(null, response(err.statusCode, err)));
};
