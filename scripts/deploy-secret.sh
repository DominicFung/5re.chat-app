#!/bin/zsh

FSECRETJSON=$( cat frontend.secret.json )
BSECRETJSON=$( cat backend.secret.json )
CDKOUTJSON=$( cat cdk-outputs.json )

aws secretsmanager create-secret --name firechat/fsecret \
--description "Third Party Frontend Secrets for 5re.chat" \
--secret-string "$FSECRETJSON" --region us-east-1 --profile juju

aws secretsmanager create-secret --name firechat/bsecret \
--description "Third Party Backend Secrets for 5re.chat" \
--secret-string "$BSECRETJSON" --region us-east-1 --profile juju

aws secretsmanager create-secret --name firechat/cdk \
--description "AWS Infrastructure for 5re.chat" \
--secret-string "$CDKOUTJSON" --region us-east-1 --profile juju