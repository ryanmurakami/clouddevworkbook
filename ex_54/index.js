const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-west-2' })

const db = new AWS.DynamoDB.DocumentClient()
const tableName = 'clouddev'

async function putRecord (id, name) {
  const params = {
    TableName: tableName,
    Item: {
      id,
      name
    }
  }

  try {
    const res = await db.put(params).promise()
    console.log(res)
  } catch (err) {
    console.error('Could not put record: ', err)
  }
}

// putRecord('4', 'ryan2')

async function getRecord (tableName, hashKey, val) {
  const params = {
    TableName: tableName,
    Key: {
      [hashKey]: val
    }
  }

  try {
    const res = await db.get(params).promise()
    console.log(res.Item)
  } catch (err) {
    console.error('Error getting record: ', err)
  }
}

getRecord(tableName, 'id', '4')

async function queryRecord (tableName, indexName, hashKey, val) {
  const params = {
    TableName: tableName,
    IndexName: indexName,
    KeyConditionExpression: '#n = :hval',
    ExpressionAttributeNames: {
      '#n': hashKey
    },
    ExpressionAttributeValues: {
      ':hval': val
    }
  }

  try {
    const res = await db.query(params).promise()
    console.log(res)
  } catch (err) {
    console.error('Error querying record: ', err)
  }
}

// queryRecord('clouddev', 'clouddev-name', 'name', 'ryan')