Steps to set up the application for Angularjs with jasmine

Assuptions:
already node modules are installed in your system

run the below cmds to test to node is succesfully installed or not
-----------------------------------------------------------------

node --version                                                                                                   
npm --version


steps to setup the project
--------------------------------------
1. create a folder jasminedemo
2. create a 2 folders app and test in the main folder(jasminedemo)
3. open the cmd prompt and navigate to jasminedeme

and follow the below steps
==========================================


step 1 : npm init (fill the details as you like its optional) it will create package.json file in your main folder.                                                                                                  
step 2 : npm install karma --save-dev (--save-dev means it will add the reference in your package.json).                                                                                                  
step 3 : npm install karma-jasmine --save-dev (same as above).                                                                                                  
step 4 : npm install karma-chrome-launcher --save-dev (same as above).                                                                                                  
step 5 : karma init (initialize the karma to create a karma.config.js file[same as npm init]).                                                                                                  
step 6 : if karma not defined while running above cmd (npm install karma -g).                                                                                                  
step 7 : karma init (see karma init file.png in attached folder for reference).                                                                                                  
step 8 : wrtie the test cases in the test folder .                                                                                                  
step 9 : karma start karma.config.js (in the cmd prompt).                                                                                                  


To load the front end packages  (contine........ step 9 above)
============================================

step 1 : npm install bower -g (-g refers to globally).                                                                                                                                                                                                    
step 2 : now open git bash and navigate to main folder(jasminedemo).                                                                                                  
step 3 : bower install angular( can install front end package through bower install xxxxxxxxxx).                                                                                                  
step 4 : bower install angular-mocks.                                                                                                  
step 5 : bower install angular-resource.                                                                                                  



To start the test cases
==================================


step 1 : navigate to main folder(jasminedemo) .                                                                                                  
step 2 : npm install(because I have removed the node modules).                                                                                                  
step 2 : karma start karma.config.js .                                                                                                  
                                                                                                  



