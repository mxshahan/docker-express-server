#!/bin/bash

if [ "$1" == "up" ]; then
  read -p "Want to build? (y/N): " flag
  if [ $flag == "y" ]; then
    echo "choosed: Yes"
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
    exit 1
  else 
    echo "choosed: No"
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d 
  fi
elif [ "$1" == "down" ]; then 
  read -p "Want to remove associated volume? (y/N): " flag
  if [ $flag == "y" ]; then
    echo "choosed: Yes"
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v
    exit 1
  else 
    echo "choosed: No"
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
  fi
else 
  echo "Please pass a parameter up or down"
fi