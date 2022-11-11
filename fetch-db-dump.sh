#!/bin/bash

curl http://ergast.com/downloads/f1db.sql.gz --output dump.sql.gz

export PGHOST=localhost
export PGUSER=postgres
export PGPASSWORD=postgres
export PGDATABASE=f1-dashboard

export MYSQL_HOST=127.0.0.1
export MYSQL_PWD=password

mysql -u root -e "drop database testdb";
mysql -u root -e "create database testdb";
gunzip < dump.sql.gz | mysql -u root -p testdb