# Event Bridge in AWS SAM

### Introduction

Using EventBridge to match the rules triggering different lambda based on shop name.

### Working steps

- AWS Eventbridge will get events and based on matching rules it will generate the respective target
- In this Place Order will put event into Eventbridge.
- There are two rules defined in it based on shop name.
- If shop name is dominos it will match the rule and trigger the particular target(in this example it is dominos lambda) and vice versa
