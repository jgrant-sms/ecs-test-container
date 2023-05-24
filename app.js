const express = require('express');
const { LambdaClient, InvokeCommand } = require('@aws-sdk/client-lambda');

const app = express();
const lambda = new LambdaClient({ region: 'us-east-1' });

const PORT = process.env.PORT || 3000
const LAMBDA_FUNCTION_NAME = process.env.LAMBDA_FUNCTION_NAME

const instanceId = Math.random().toString(36).substring(7);

app.get('/encrypt', async (req, res) => {
  try {
    const lambdaParams = {
      FunctionName: LAMBDA_FUNCTION_NAME,
      Payload: JSON.stringify({ action: 'encrypt', instanceId }),
    };

    const command = new InvokeCommand(lambdaParams);
    const response = await lambda.send(command);

    const result = JSON.parse(response.Payload.toString());

    const apiResponse = {
      instanceId,
      result,
    };

    return res.json(apiResponse);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to invoke Lambda function' });
  }
});

app.get('/decrypt', async (req, res) => {
  try {
    const lambdaParams = {
      FunctionName: LAMBDA_FUNCTION_NAME,
      Payload: JSON.stringify({ action: 'decrypt', instanceId }),
    };

    const command = new InvokeCommand(lambdaParams);
    const response = await lambda.send(command);

    const result = JSON.parse(response.Payload.toString());

    const apiResponse = {
      instanceId,
      result,
    };

    return res.json(apiResponse);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to invoke Lambda function' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
