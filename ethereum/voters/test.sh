#!/bin/bash

TESTACCTA='0x8c34f41f1cf2dfe2c28b1ce7808031c40ce26d38'
TESTACCTB='0x147b61187f3f16583ac77060cbc4f711ae6c9349'
TESTPVTA='0x0bce878dba9cce506e81da71bb00558d1684979711cf2833bab06388f715c01a'
TESTPVTB='0xff7da9b82a2bd5d76352b9c385295a430d2ea8f9f6f405a7ced42a5b0e73aad7'

SCA='0xf68580c3263fb98c6eaee7164afd45ecf6189ebb'
ENSNAME='registrars.somewhere.eth'

echo CONFIRM is ganache running?:
read -p '[N/y]: ' ans
if [[ $ans != "y" && $ans != "Y" ]]; then
  echo ""
  echo Please run the following before this:
  echo ""
  echo -n ganache-cli ""
  echo -n --account=\"$TESTPVTA,100000000000000000000\" ""
  echo -n --account=\"$TESTPVTB,100000000000000000000\" ""
  echo  --account=\"$TESTPVTC,100000000000000000000\"
  echo ""
  exit
fi

echo deploy? :
read -p '[N/y]: ' ans
if [[ $ans == "y" || $ans == "Y" ]]; then
  echo
  echo deploying Registrars ...
  node ./cli.js 0 0 deploy $ENSNAME
  sleep 1
fi

echo
echo run tests? :
read -p '[N/y]: ' ans
if [[ $ans != "y" && $ans != "Y" ]]; then
  exit
fi

echo do tests ...
node cli.js 0 $SCA cmd args
echo

echo ensname is as provided at deployment
node cli.js 0 $SCA variables
echo

echo fails ... only CEO can appoint next CEO
node cli.js 1 $SCA appoint $TESTACCTB
echo

echo CEO can appoint next CEO
node cli.js 0 $SCA appoint $TESTACCTB
echo

echo CEO can add a registrar
node cli.js 1 $SCA setRegistrar $TESTACCTA true
echo

echo fails ... only CEO can add a registrar even if caller is a registrar
node cli.js 0 $SCA setRegistrar $TESTACCTA true
echo

echo fails ... only CEO can disable a registrar
node cli.js 0 $SCA setRegistrar $TESTACCTA false
echo

echo CEO can disable a registrar
node cli.js 1 $SCA setRegistrar $TESTACCTA false
echo

echo CEO can reenable a registrar
node cli.js 1 $SCA setRegistrar $TESTACCTA true
echo

echo Registrars rejects direct payments of ETH
echo

echo list the events
node cli.js 0 $SCA events
echo

