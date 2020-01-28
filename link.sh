#!/bin/bash

cd node_modules
ln -s ../../docere-projects docere-projects

rm -rf huc-faceted-search
ln -s ../../huc-faceted-search huc-faceted-search
