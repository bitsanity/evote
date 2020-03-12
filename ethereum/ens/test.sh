#!/bin/bash

TESTACCTA='0x8c34f41f1cf2dfe2c28b1ce7808031c40ce26d38'
TESTACCTB='0x147b61187f3f16583ac77060cbc4f711ae6c9349'
TESTPVTA='0x0bce878dba9cce506e81da71bb00558d1684979711cf2833bab06388f715c01a'
TESTPVTB='0xff7da9b82a2bd5d76352b9c385295a430d2ea8f9f6f405a7ced42a5b0e73aad7'
SCA='0xF68580C3263FB98C6EAeE7164afD45Ecf6189EbB'

echo CONFIRM running:
echo ""
echo -n ganache-cli ""
echo -n --account=\"$TESTPVTA,100000000000000000000\" ""
echo -n --account=\"$TESTPVTB,100000000000000000000\" ""
echo ""
echo ""
read -p '[N/y]: ' ans
if [[ $ans != "y" && $ans != "Y" ]]; then
  echo ""
  echo Please run the following before this:
  echo ""
  exit
fi

echo "deploy ENSMock?"
read -p '[N/y]: ' ans
if [[ $ans == "y" || $ans == "Y" ]]; then
  node cli.js 0 0 deploy
fi
echo ""

echo "run tests?"
read -p '[N/y]: ' ans
if [[ $ans != "y" && $ans != "Y" ]]; then
  exit
fi

CASC=`node cli.js 0 0 namehash cascadia.eth`
RARS=`node cli.js 0 0 namehash registrars.cascadia.eth`
VTRS=`node cli.js 0 0 namehash voters.cascadia.eth`
ELEC=`node cli.js 0 0 namehash vote2022.cascadia.eth`

echo '--'
echo 'namehashes:'
echo '  cascadia.eth :' $CASC
echo '  registrars.cascadia.eth :' $RARS
echo '  voters.cascadia.eth :' $VTRS
echo '  vote2022.cascadia.eth :' $ELEC
echo '--'

echo '--'
RLBL=`node cli.js 0 0 namehash registrars`
VLBL=`node cli.js 0 0 namehash voters`
ELBL=`node cli.js 0 0 namehash vote2022`
node cli.js 0 $SCA setAddr $RARS
node cli.js 0 $SCA setAddr $VTRS
node cli.js 0 $SCA setAddr $ELEC
echo '--'

