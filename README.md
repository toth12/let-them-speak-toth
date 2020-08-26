# Let Them Speak

> A database of Holocaust survivor testimonies.

## August 2020 note

This document once detailed how to carefully build a server or single docker
image with all three service components — Mongo, BlackLab and this web app —
running on the same (virtual) machine or container. Those instructions can now
be found in the OLD-README.md file in this repository.

This repository is now concerned only with the web application component of Let
Them Speak. A new [deployment repo](https://github.com/jakekara/lts-cloud),
which includes this repository as a submodule, is concerned with getting all
three components up and running in a more automated, reproducible manner using
containers.

This repository was kept separate as a git submodule in order to maintain a
continuous development history of the web application component.

**Generally, you should not clone this repository directly, but instead clone
the deployment repo, which contains this repository as a submodule**

## Getting started

Since this repository only contains the web application code, the best way to
get started running this application in containers, the preferred approach, is
to check out the [deployment repo](https://github.com/jakekara/lts-cloud).

## Developing

The [deployment repo](https://github.com/jakekara/lts-cloud) contains scripts to
build and test this application.
