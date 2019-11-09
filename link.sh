#!/bin/bash
projects=( gekaaptebrieven utrechtpsalter vangogh )
cwd=`pwd`

for project in "${projects[@]}"
do
	:
	npm link "docere-project-$project"
	cd "$cwd/node_modules/docere-project-$project"	
	npm link docere
	cd "$cwd"
done
