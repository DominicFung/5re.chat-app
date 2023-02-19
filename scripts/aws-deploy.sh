#!/bin/zsh

PROJECT=fireChat

echo "checking old cdk-output.json ..."
OLDAPPSYNC=$( cat cdk-outputs.json | python3 -c "import sys, json; print(json.load(sys.stdin)['$PROJECT-AppsyncStack']['${PROJECT}AppsyncId'])" )
echo $OLDAPPSYNC
echo

echo "tsc & cdk deploy ..."
tsc & cdk deploy --all --outputs-file ./cdk-outputs.json --profile juju --require-approval never

echo "copying cdk-outputs.json ..."
cp -f cdk-outputs.json ../cdk-outputs.json 

cd ../ 

echo "uploading secrets / cdk-outputs to AWS ..."
./scripts/update-secret.sh 

NEWAPPSYNC=$( cat cdk-outputs.json | python3 -c "import sys, json; print(json.load(sys.stdin)['$PROJECT-AppsyncStack']['${PROJECT}AppsyncId'])" )
echo $NEWAPPSYNC
echo

if [[ $OLDAPPSYNC = $NEWAPPSYNC ]]; then
  echo "updating codegen ..."
  amplify codegen
else
  echo "opps, appsync id changed: $OLDAPPSYNC ==> $NEWAPPSYNC"
  amplify codegen remove

  echo "run: amplify codegen add --apiId $NEWAPPSYNC"
fi