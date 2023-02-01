#!/bin/zsh

SECRETJSON=$( cat secret.json )
CDKOUTJSON=$( cat cdk-outputs.json )

aws secretsmanager create-secret --name firechat/secret \
--description "Third Party Secrets for 5re.chat" \
--secret-string "$SECRETJSON" --region us-east-1 --profile juju

aws secretsmanager create-secret --name firechat/cdk \
--description "AWS Infrastructure for 5re.chat" \
--secret-string "$CDKOUTJSON" --region us-east-1 --profile juju