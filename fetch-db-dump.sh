#!/bin/bash

curl http://ergast.com/downloads/f1db.sql.gz --output dump.sql.gz

mysql -h 127.0.0.1 -u root --password=password -e "drop database f1database";
mysql  -h 127.0.0.1 -u root --password=password -e "create database f1database";
gunzip < dump.sql.gz | mysql -u root --password=password -h 127.0.0.1 f1database

rm dump.sql.gz