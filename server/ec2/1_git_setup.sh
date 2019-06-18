#!/usr/bin/env bash

# 1_git_setup.sh - Prime th ec2 machine to pull in the repo
#                  and run the rest of the setup scripts
#
#                - usage: copy and paste this, then follow
#                         directions when prompted
#

sudo yum install -y mlocate  && sudo updatedb
sudo yum install -y emacs-nox

# Add SSH key to github 
yes y | ssh-keygen -q -t rsa -N '' -f ~/.ssh/ghub >/dev/null
ssh-add ~/.ssh/ghub
echo ""
echo "GO HERE: 
https://github.com/settings/ssh/new"
echo "AND PASTE THIS PUBLIC KEY:"
cat ~/.ssh/ghub.pub

echo ""
if [ $? -ne 0 ]; then echo "Something went wrong :("; exit 1; fi
read -p "Once you've done that, press enter to continue. "

# clone the repo
sudo yum groupinstall -y "Development Tools"
git clone https://github.com/YaleDHLab/let-them-speak --branch june-2019

if [ $? -ne 0 ]; then echo "Something went wrong :("; exit 1; fi
read -p "Once you've done that, press enter to continue. "

# Run the rest of the setup code
bash let-them-speak/ec2/2_install_system_software.sh
bash let-them-speak/ec2/3_start_app.sh