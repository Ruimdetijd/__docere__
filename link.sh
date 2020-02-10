#!/bin/bash

cd node_modules

rm -rf docere-projects
ln -s ../../docere-projects docere-projects

rm -rf docere-api
ln -s ../../docere-api docere-api

# rm -rf huc-faceted-search
# ln -s ../../huc-faceted-search huc-faceted-search

# rm -rf docere-text-view
# ln -s ../../docere-text-view docere-text-view
