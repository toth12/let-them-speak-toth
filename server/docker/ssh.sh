#!/bin/bash

# purge any previous entries in ~/.ssh/known_hosts for localhost:7022
ssh-keygen -R [localhost]:7022

# ssh into the container using port 7022
ssh -p 7022 root@localhost
