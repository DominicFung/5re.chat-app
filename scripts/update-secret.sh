#!/bin/zsh

SECRETJSON=$( cat secret.json )
CDKOUTJSON=$( cat cdk-outputs.json )

aws secretsmanager update-secret --secret-id firechat/secret \
--description "Third Party Secrets for 5re.chat" \
--secret-string "$SECRETJSON" --region us-east-1 --profile juju

aws secretsmanager update-secret --secret-id firechat/cdk \
--description "AWS Infrastructure for 5re.chat" \
--secret-string "$CDKOUTJSON" --region us-east-1 --profile juju