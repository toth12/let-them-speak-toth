#!/usr/bin/env bash

# 1_git_setup.sh - Prime th ec2 machine to run bootstrap scripts
#
# DIRECTIONS
# ==========
# Set up an AWS linux machine
# Give it read access to the bucket with the data
# 
#

sudo yum install -y mlocate  && sudo updatedb
sudo yum install -y emacs-nox

# Add SSH key to github 
yes y | ssh-keygen -q -t rsa -N '' -f ~/.ssh/ghub >/dev/null
eval $(ssh-agent)
ssh-add ~/.ssh/ghub
echo ""
echo "GO HERE: 
https://github.com/settings/ssh/new"
echo "AND PASTE THIS PUBLIC KEY:"
cat ~/.ssh/ghub.pub

echo ""
if [ $? -ne 0 ]; then echo " Something went wrong while generating key :("; exit 1; fi
read -p "Once you've done that, press enter to continue. "

# clone the repo
sudo yum groupinstall -y "Development Tools"
git clone git@github.com:YaleDHLab/let-them-speak.git --branch june-2019

if [ $? -ne 0 ]; then echo " Something went wrong while cloning the repo"; exit 1; fi

# Done
echo "Now run:
bash let-them-speak/server/ec2/2_install_system_software.sh"

