#! /bin/bash

GREEN=`tput setaf 2`
RESET=`tput sgr0`

CONTRACT=AlastriaProxy.sol
TIMEOUT=60

for d in ../SmartContracts/*/ ; do
	#echo $d
	for f in $d* ; do
		contract=`echo ${f} | awk -F/ '{print $NF}'`
		echo $contract
		docker run -d --name $contract -v $(pwd)/../SmartContracts:/tmp mythril/myth -v 3 analyze --solv 0.4.23 --execution-timeout $TIMEOUT /tmp/identityManager/$contract -o jsonv2 > reports/audit_${contract}.json
	done
done
exit 0
