#! /bin/bash

#
# Usage: ./getReports.sh
#
#
# This script collects the responses from audit.sh
# and stores them in "reports/"
#
#
# Author: Víctor Nieves Sánchez
# email: vnievess@gmail.com
#

SCDIR=../alastriaSCs

# Create reports dir if not exists
mkdir -p reports
# Timestamp
timestamp=$(date "+%Y-%m-%d")

for d in $SCDIR/*/ ; do
	for f in $d* ; do
		contract=`echo ${f} | awk -F/ '{print $NF}'`
        	docker logs $contract > reports/audit_${contract}_${timestamp}.txt
    done
done
echo Reports obtained successfully
exit 0
