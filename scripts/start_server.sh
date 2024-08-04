#!/bin/bash
# Stop the existing process
pm2 stop all

# Start the new process
pm2 start /home/ubuntu/front/server.js --name looglefront
