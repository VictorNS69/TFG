#! /bin/bash

#
# Usage: ./audit.sh
#
#
# This script analyzes the Alastria Smart Contracts (MVP1) 
# and after the chosen time (TIMEOUT variable) a report with the analysis will be generated.
#
# To read the report you have to look at the logs of each docker
# Example: docker logs AlastriaProxy.sol
#
#
# Author: Víctor Nieves Sánchez
# email: vnievess@gmail.com
#

SCDIR=../alastriaSCs
# Time in seconds
TIMEOUT=3600

for d in $SCDIR/*/ ; do
	#echo $d
	for f in $d* ; do
		contract=`echo ${f} | awk -F/ '{print $NF}'`
		dir=`echo ${f} | awk -F/ '{print $(NF-1)}'`
		echo $dir/$contract
		# Add "-o jsonv2" at the end if you want a JSON object as output
		docker run -d --name $contract -v $(pwd)/$SCDIR:/tmp mythril/myth -v 3 analyze --solv 0.4.23 --execution-timeout $TIMEOUT /tmp/$dir/$contract > reports/audit_${contract}.json
	done
done
exit 0
