const assert = require("assert");
const { PubSub } = require("@google-cloud/pubsub");

const topicName = "testTopic";
const subscriptionName = "testSub";

const testSubjectStub = require("../index").setUp({
  topics: {
    [topicName]: {
      subscriptions: [subscriptionName]
    }
  }
});

const pubsub1 = new PubSub();
const publisher = pubsub1.topic(topicName);

const pubsub2 = new PubSub();
const subscription = pubsub2.subscription(subscriptionName);

subscription.on("message", message => {
  assert.deepEqual(message, { data: '{"a":1}', attributes: { attribute1: 1 } });
  message.ack()
});

publisher.publish(
  Buffer.from(
    JSON.stringify({
      a: 1
    })
  ),
  { attribute1: 1 }
);

console.log("Feel free to contribute more tests :*");