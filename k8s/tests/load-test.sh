#!/bin/bash
counter=1
max_requests=10000

while [ $counter -le $max_requests ]; do
    echo "Fazendo solicitação $counter"
    curl -m 10 -s -o /dev/null -w "%{http_code}" localhost:3000/api/clients
    counter=$((counter+1))
    sleep $1
done
