import {
  EventBridgeClient,
  PutEventsCommand,
} from "@aws-sdk/client-eventbridge";

const eventbridge = new EventBridgeClient({ region: "us-east-1" });

async function putEventInEventBridge(orderDetails) {
  const detail = {
    shopName: orderDetails.shopName,
    order: orderDetails.order,
    customerName: orderDetails.name,
    amount: orderDetails.amount,
  };

  const params = {
    Entries: [
      {
        Detail: JSON.stringify(detail),
        DetailType: "order",
        Source: "custom.placeOrder",
      },
    ],
  };

  console.log(params);

  const command = new PutEventsCommand(params);
  return eventbridge.send(command);
}

export const handler = async (event) => {
  console.log("putOrder");

  const orderDetails = JSON.parse(event.body);

  try {
    const data = await putEventInEventBridge(orderDetails);
    console.log(data);

    return {
      statusCode: 200,
      body: JSON.stringify(orderDetails),
      headers: {},
    };
  } catch (error) {
    console.error("Error sending event to EventBridge:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to send event to EventBridge" }),
      headers: {},
    };
  }
};
