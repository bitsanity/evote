#!/bin/bash

TESTPVTA='0x0bce878dba9cce506e81da71bb00558d1684979711cf2833bab06388f715c01a'
TESTPVTB='0xff7da9b82a2bd5d76352b9c385295a430d2ea8f9f6f405a7ced42a5b0e73aad7'
TESTACCTA='0x8c34f41f1cf2dfe2c28b1ce7808031c40ce26d38'
TESTACCTB='0x147b61187f3f16583ac77060cbc4f711ae6c9349'

echo CONFIRM running:
echo ""
echo -n ganache-cli ""
echo -n --account=\"$TESTPVTA,100000000000000000000\" ""
echo -n --account=\"$TESTPVTB,100000000000000000000\" ""
echo ""
echo ""
read -p '[N/y]: ' ans
if [[ $ans != "y" && $ans != "Y" ]]; then
  exit
fi

VDOM="cascadia.eth"
VREG="registrars"
VVOT="voters"
VLEC="election2022"

echo ""
pushd ens
echo ===== namehashes =====
EDOM=`node cli.js 0 0 namehash $VDOM`
RNOD=`node cli.js 0 0 namehash $VREG.$VDOM`
VNOD=`node cli.js 0 0 namehash $VVOT.$VDOM`
ENOD=`node cli.js 0 0 namehash $VLEC.$VDOM`
popd
echo ""

# Smart contracts must be deployed in order
ENS='0xF68580C3263FB98C6EAeE7164afD45Ecf6189EbB'
REGS='0x4Ebf4321A360533AC2D48A713B8f18D341210078'
VTRS='0x9E8bFcBC56a63ca595C262e1921D3B7a00BB9cF0'
ELEC='0xDbB97B008f97895A4F38a7f00e9C2B78a4bC5941'

# Candidate: Alice
C1_NAME='Alice Aardvark'
C1_CHALL="aAMydcLuhYrZjvADDPvFKYcsDxN6mL8iDMgEgY0kRCg84DBFAiEAv2a8c7UYrbV8Itu3nX+zRsxX5gpuxoD3nYEFc230R2ECIGkq4ILme9QqX8YDkVau/XwFuroae1qbY0rX7v+DRlDu"

C2_NAME='Bob Badger'
C2_CHALL="ZwM+D+xGUViS4R0RDH/FpOEJWl9YaZEmA9OaiMaCt0OHdjBEAiBSEoxzsbwwE6RY+70A4sztd0kmmxt42hrJb0RlGhmzUwIgTCqFJze7R9OUPB9oX1AurmO21i4yMgBGicuITq49MY4="

C3_NAME='Charlie Cheetah'
C3_CHALL="ZwP0P3tjh67dH33mJ/y7S3gDugyGd5yQzxk+o28lBic1HDBEAiBlhIGAErKe64jMzrrzE+1n1LZnii4lskMzlmxpgnpIPwIgeZUFoOcb34yoyQPZ5QDpZfsFnkIwGsLNpTzmUgLtPTo="

echo ""
echo "===== deploying contracts ====="
pushd ens
node cli.js 0 0 deploy
popd
echo ""

pushd registrars
node cli.js 0 0 deploy $VREG.$VDOM
popd
echo ""

pushd voters
node cli.js 0 0 deploy $VVOT.$VDOM $REGS
popd
echo ""

pushd votes
node cli.js 0 0 deploy $VLEC.$VDOM $VTRS
popd
echo ""

echo ""
echo "===== configuring ENS ====="
pushd ens
node cli.js 0 $ENS setAddr $RNOD $REGS
node cli.js 0 $ENS setAddr $VNOD $VTRS
node cli.js 0 $ENS setAddr $ENOD $ELEC
popd
echo ""

echo ""
echo "===== Set Account(0) as Registrar ====="
pushd registrars
node cli.js 0 $REGS setRegistrar $TESTACCTA "true"
popd
echo ""

echo ""
echo "===== Set up 3 Candidates ====="
pushd votes
node cli.js 0 $ELEC setCandidate "$C1_NAME" $C1_CHALL "true"
node cli.js 0 $ELEC setCandidate "$C2_NAME" $C2_CHALL "true"
node cli.js 0 $ELEC setCandidate "$C3_NAME" $C3_CHALL "true"

node cli.js 0 $ELEC setRunning "true"
popd
echo ""

